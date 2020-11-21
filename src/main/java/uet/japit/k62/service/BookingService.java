package uet.japit.k62.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import uet.japit.k62.dao.IBookingDAO;
import uet.japit.k62.dao.IEventDAO;
import uet.japit.k62.dao.ITicketClassDAO;
import uet.japit.k62.dao.IVoucherDAO;
import uet.japit.k62.exception.exception_define.detail.*;
import uet.japit.k62.models.entity.*;
import uet.japit.k62.models.request.ReqBookingSelectTicket;
import uet.japit.k62.models.request.ReqSelectedTicket;
import uet.japit.k62.models.response.data_response.ResBooking;
import uet.japit.k62.models.response.data_response.ResBookingDetail;
import uet.japit.k62.models.response.data_response.ResTicketClass;
import uet.japit.k62.service.payment.IPayment;
import uet.japit.k62.service.payment.MomoPayment;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class BookingService {
    @Value("${booking.time-out}")
    private int timeout;
    @Autowired
    private ITicketClassDAO ticketDao;
    @Autowired
    private IBookingDAO bookingDAO;
    @Autowired
    private IEventDAO eventDAO;
    @Autowired
    private IVoucherDAO voucherDAO;
    @Autowired
    private RestTemplateBuilder restTemplateBuilder;

    public List<ResTicketClass> getTicketInfo(String event_id){
        List<TicketClass> tickets = ticketDao.findByEventID(event_id);
        return tickets.stream().map(ResTicketClass::new).collect(Collectors.toList());
    }

    public ResBooking selectTickets(ReqBookingSelectTicket reqBooking, String eventId) throws TicketNotFoundException, MaximumTicketExceeded, MinimumTicketNotReached, VoucherNotFoundException, InvalidVoucherException, EventNotFoundException {
        // validate amount
        List<TicketClass> dbTickets = new ArrayList<>();
        for(ReqSelectedTicket ticket : reqBooking.getTickets()){
            TicketClass dbTicket = ticketDao.findById(ticket.getTicket_id()).orElseThrow(TicketNotFoundException::new);
            dbTickets.add(dbTicket);
            // TODO: recalculate number ticket available
            int availableTicket = dbTicket.getNumberAvailable() - bookingDAO.getNumberReservedTicket(eventId, dbTicket.getId());
            if(ticket.getAmount() > availableTicket || ticket.getAmount() > dbTicket.getMaxPerPerson()){
                throw new MaximumTicketExceeded();
            }
            if(ticket.getAmount() < dbTicket.getMinPerPerson()){
                throw new MinimumTicketNotReached();
            }
        }

        // validate promotion
        Voucher voucher = voucherDAO.findByCode(reqBooking.getVoucher()).orElseThrow(VoucherNotFoundException::new);
        Event event = eventDAO.findById(eventId).orElseThrow(EventNotFoundException::new);
        // check voucher valid for this booking
        if((voucher.getType() == VoucherType.EVENT  && !eventId.equals(voucher.getConditionValue())) ||
                (voucher.getType() == VoucherType.CATEGORY && !event.getCategory().getId().equals(voucher.getConditionValue()))||
                (voucher.getType() == VoucherType.EVENT && !event.getCreatedBy().equals(voucher.getConditionValue()))){
            throw new InvalidVoucherException();
        }
        long price = 0;
        // create tmp booking
        Booking booking = new Booking();
        booking.setStatus(BookingStatus.RESERVED);
        booking.setEmailBooking(reqBooking.getEmail());
        booking.setPhoneBooking(reqBooking.getPhone());
        booking.setTotalTicket(reqBooking.getTickets().size());
        // calculate price and add ticket
        ArrayList<BookingDetail> bookingDetails = new ArrayList<>(dbTickets.size());
        ArrayList<ResBookingDetail> resBookingDetails = new ArrayList<>(dbTickets.size());
        for (int i = 0; i < dbTickets.size(); i++){
            TicketClass dbTicket = dbTickets.get(i);
            ReqSelectedTicket reqTicket = reqBooking.getTickets().get(i);
            price += (dbTicket.getPrice().longValue() * reqTicket.getAmount());
            bookingDetails.add(i, new BookingDetail(reqTicket.getAmount(), dbTicket, booking));
            resBookingDetails.add(i, new ResBookingDetail(dbTicket.getName(), dbTicket.getPrice(), reqTicket.getAmount()));
        }
        booking.setBookingDetailList(bookingDetails);
        booking.setEvent(new Event(eventId));
        if(price > voucher.getMinOrder()){
            price -= Math.min(price * voucher.getDiscountPercentage() / 100, voucher.getMaximumDiscount().longValue());
        }
        booking.setPrice(new BigDecimal(price));
        bookingDAO.save(booking);
//        bookingDetailDAO.saveAll(bookingDetails);
        return new ResBooking(booking, resBookingDetails);
    }

    public String checkout(String bookingId, String paymentType) throws PaymentTypeNotSupported, BookingNotFoundException, PaymentCreateRequestException, InvalidPaymentException {
        IPayment payment;
        if (paymentType.equals("momo")){
            payment = new MomoPayment(restTemplateBuilder);
        }
        else {
            throw new PaymentTypeNotSupported();
        }
        Booking booking = bookingDAO.findById(bookingId).orElseThrow(BookingNotFoundException::new);
        // check if booking is not time out
        if (booking.getStatus() == BookingStatus.RESERVED
                && TimeUnit.DAYS.convert((new Date().getTime())- booking.getCreatedAt().getTime(), TimeUnit.MINUTES) < timeout){
            System.out.println("create payment request");
            return payment.createPaymentRequest(bookingId, booking.getPrice().longValue(), booking.getEmailBooking());
        }
        else {
            throw new InvalidPaymentException();
        }
    }
}
