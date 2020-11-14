package uet.japit.k62.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uet.japit.k62.dao.IBookingDAO;
import uet.japit.k62.dao.ITicketClassDAO;
import uet.japit.k62.dao.IVoucherDAO;
import uet.japit.k62.exception.exception_define.detail.*;
import uet.japit.k62.models.entity.*;
import uet.japit.k62.models.request.ReqBookingSelectTicket;
import uet.japit.k62.models.request.ReqSelectedTicket;
import uet.japit.k62.models.response.data_response.ResTicketClass;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {
    @Autowired
    private ITicketClassDAO ticketDao;
    private IBookingDAO bookingDAO;
    @Autowired
    private IVoucherDAO voucherDAO;
    public List<ResTicketClass> getTicketInfo(String event_id){
        List<TicketClass> tickets = ticketDao.findByEventID(event_id);
        return tickets.stream().map(ResTicketClass::new).collect(Collectors.toList());
    }

    public void selectTickets(ReqBookingSelectTicket reqBooking) throws TicketNotFoundException, MaximumTicketExceeded, MinimumTicketNotReached, VoucherNotFoundException, InvalidVoucherException {
        // validate amount
        List<TicketClass> dbTickets = new ArrayList<>();
        for(ReqSelectedTicket ticket : reqBooking.getTickets()){
            TicketClass dbTicket = ticketDao.findById(ticket.getTicket_id()).orElseThrow(TicketNotFoundException::new);
            dbTickets.add(dbTicket);
            // TODO: recalculate number ticket available
            if(ticket.getAmount() > dbTicket.getNumberAvailable() || ticket.getAmount() > dbTicket.getMaxPerPerson()){
                throw new MaximumTicketExceeded();
            }
            if(ticket.getAmount() < dbTicket.getMinPerPerson()){
                throw new MinimumTicketNotReached();
            }
        }

        // validate promotion
        Voucher voucher = voucherDAO.findByCode(reqBooking.getVoucher()).orElseThrow(VoucherNotFoundException::new);
        // check voucher valid for this booking
        if((voucher.getType() == VoucherType.EVENT  && !reqBooking.getEventId().equals(voucher.getConditionValue())) ){
            throw new InvalidVoucherException();
        }
        // calculate price
        long price = 0;

        // create tmp booking
        Booking booking = new Booking();
        booking.setStatus(BookingStatus.RESERVED);
        booking.setEmailBooking(reqBooking.getEmail());
        booking.setPhoneBooking(reqBooking.getPhone());
        booking.setTotalTicket(reqBooking.getTickets().size());
        ArrayList<BookingDetail> bookingDetails = new ArrayList<>(dbTickets.size());
        for (int i = 0; i < dbTickets.size(); i++){
            price += (dbTickets.get(i).getPrice().longValue() * reqBooking.getTickets().get(i).getAmount());
            bookingDetails.add(i, new BookingDetail(reqBooking.getTickets().get(i).getAmount(), dbTickets.get(i), booking));
        }
        booking.setBookingDetailList(bookingDetails);
        booking.setEvent(new Event(reqBooking.getEventId()));
        if(price > voucher.getMinOrder()){
            price -= Math.min(price * voucher.getDiscountPercentage() / 100, voucher.getMaximumDiscount().longValue());
        }
        booking.setPrice(new BigDecimal(price));
        bookingDAO.save(booking);


    }
}
