package uet.japit.k62.service;

import com.google.zxing.WriterException;
import com.lowagie.text.DocumentException;
import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import uet.japit.k62.dao.*;
import uet.japit.k62.exception.exception_define.common.UnAuthorException;
import uet.japit.k62.exception.exception_define.detail.*;
import uet.japit.k62.job.MailProcess;
import uet.japit.k62.models.entity.*;
import uet.japit.k62.models.request.ReqAttachmentFile;
import uet.japit.k62.models.request.ReqBookingSelectTicket;
import uet.japit.k62.models.request.ReqSelectedTicket;
import uet.japit.k62.models.request.ReqSendMail;
import uet.japit.k62.models.request.payment.IPN;
import uet.japit.k62.models.response.data_response.*;
import uet.japit.k62.models.response.data_response.payment.VnPayIPN;
import uet.japit.k62.service.authorize.AttributeTokenService;
import uet.japit.k62.service.payment.IPayment;
import uet.japit.k62.service.payment.MomoPayment;
import uet.japit.k62.service.payment.VnPayPayment;
import uet.japit.k62.util.ContentUtil;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class BookingService {
    @Value("${booking.time-out}")
    private long timeout;
    @Autowired
    private ITicketClassDAO ticketDao;
    @Autowired
    private IBookingDAO bookingDAO;
    @Autowired
    private IBookingDetailDAO bookingDetailDAO;
    @Autowired
    private IEventDAO eventDAO;
    @Autowired
    private IVoucherDAO voucherDAO;
    @Autowired
    private RestTemplateBuilder restTemplateBuilder;
    @Autowired
    private ITicketCodeDAO ticketCodeDAO;
    @Autowired
    private Environment env;
    @Autowired
    private IUserDAO userDAO;
    @Autowired
    MailProcess mailProcess;
    public List<ResTicketClass> getTicketInfo(String event_id) throws EventNotFoundException, NotInBookingTimeException {
        Event event = eventDAO.findById(event_id).orElseThrow(EventNotFoundException::new);
        Date now = new Date();
        if(event.getStartSellingTime().compareTo(now) < 0 && event.getEndSellingTime().compareTo(now) > 0){
            List<TicketClass> tickets = ticketDao.findByEventID(event_id);
            return tickets.stream().map(ResTicketClass::new).collect(Collectors.toList());
        }
        else throw new NotInBookingTimeException();

    }

    public ResBooking selectTickets(HttpServletRequest httpRequest, ReqBookingSelectTicket reqBooking, String eventId) throws TicketNotFoundException, MaximumTicketExceeded, MinimumTicketNotReached, VoucherNotFoundException, InvalidVoucherException, EventNotFoundException, NotInBookingTimeException {
        // validate selling time
        Event event = eventDAO.findById(eventId).orElseThrow(EventNotFoundException::new);
        Date now = new Date();
        if(event.getStartSellingTime().compareTo(now) >= 0 && event.getEndSellingTime().compareTo(now) <= 0){
            throw new NotInBookingTimeException();
        }
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
        long minOrder = 0;
        double discount = 0.0;
        long maxDiscount = 0;
        if (reqBooking.getVoucher() != null && !reqBooking.getVoucher().isEmpty()){
            Voucher voucher = voucherDAO.findByCode(reqBooking.getVoucher()).orElseThrow(VoucherNotFoundException::new);
            // check voucher valid for this booking
            if((voucher.getType() == VoucherType.EVENT  && !eventId.equals(voucher.getConditionValue())) ||
                    (voucher.getType() == VoucherType.CATEGORY && !event.getCategory().getId().equals(voucher.getConditionValue()))||
                    (voucher.getType() == VoucherType.EVENT && !event.getCreatedBy().equals(voucher.getConditionValue()))){
                throw new InvalidVoucherException();
            }
            minOrder = voucher.getMinOrder();
            discount = voucher.getDiscountPercentage();
            maxDiscount = voucher.getMaximumDiscount().longValue();
        }

        long price = 0;
        // create tmp booking
        Booking booking = new Booking();
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User userSendRequest = userDAO.findByEmail(emailSendRequest);
        booking.setCreatedBy(userSendRequest.getId());
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
        if(price > minOrder){
            price -= Math.min(price * discount / 100, maxDiscount);
        }
        booking.setPrice(new BigDecimal(price));
        bookingDAO.save(booking);
        booking.setEvent(event);
        return new ResUnpaidBooking(booking, resBookingDetails);
    }

    public String checkout(String bookingId, String paymentType, String baseUrl) throws PaymentTypeNotSupported, BookingNotFoundException, PaymentCreateRequestException, InvalidPaymentException {
        IPayment payment;
        if (paymentType.equals("momo")){
            payment = new MomoPayment(restTemplateBuilder, env, baseUrl);
        }
        else if (paymentType.equals("vnpay")){
            payment = new VnPayPayment(restTemplateBuilder, env, baseUrl);
        }
        else {
            throw new PaymentTypeNotSupported();
        }
        Booking booking = bookingDAO.findById(bookingId).orElseThrow(BookingNotFoundException::new);
        // check if booking is not time out
        if (booking.getStatus() == BookingStatus.RESERVED){
            long diffTime = (new Date().getTime())- booking.getCreatedAt().getTime();
            long diffInMin = TimeUnit.MINUTES.convert(diffTime, TimeUnit.MILLISECONDS);
            if(diffInMin < timeout){
                System.out.println("create payment request");
                return payment.createPaymentRequest(bookingId, booking.getPrice().longValue(), booking.getEmailBooking());
            }
            else {
                booking.setStatus(BookingStatus.FAILED);
                bookingDAO.save(booking);
                throw new InvalidPaymentException();
            }
        }
        else {
            throw new InvalidPaymentException();
        }
    }
    public void finishPayment(IPN req){
        try {

            Booking booking = bookingDAO.findById(req.getBookingId()).orElseThrow(BookingNotFoundException::new);
            User userSendRequest = userDAO.findById(booking.getCreatedBy()).orElseThrow(UserNotFoundException::new);
            if(req.isSuccess()){
                booking.setStatus(BookingStatus.SUCCEED);
                System.out.println("create ticket code");
                List<TicketCode> ticketCodeList = new LinkedList<>();
                for (BookingDetail detail : booking.getBookingDetailList()){
                    for(int i = 0 ; i < detail.getQuantity(); i++){
                        TicketCode ticketCode = new TicketCode();
                        String code = ticketCode.getId().replace('-', 'A').toUpperCase();
                        System.out.println("Generate ticket code: " + code);
                        ticketCode.setBooking(detail);
                        ticketCode.setCode(code);
                        ticketCode.setName(detail.getTicketClass().getName());
                        ticketCode.setCreatedBy(userSendRequest.getId());
                        ticketCodeList.add(ticketCode);
                    }
                }
                ticketCodeDAO.saveAll(ticketCodeList);
                ResPaidBooking paidBooking = new ResPaidBooking(booking, ticketCodeList);
                sendTicketInformation(userSendRequest, paidBooking);
            }
            else {
                booking.setStatus(BookingStatus.FAILED);
            }
            bookingDAO.save(booking);
        } catch (BookingNotFoundException | UserNotFoundException e) {
            e.printStackTrace();
        }
    }
    public List<ResBooking> getMyBooking(HttpServletRequest httpRequest){
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User userSendRequest = userDAO.findByEmail(emailSendRequest);
        bookingDAO.updateTimeout();
        List<Booking> myBooking = bookingDAO.findByCreatedBy(userSendRequest.getId());
        return myBooking.stream().map(ResBooking::new).collect(Collectors.toList());
    }
    private byte[] generatePdfTicket(HashMap<String, Object> content) throws IOException, WriterException, DocumentException {
//        byte[] image = ContentUtil.generateQRCode(content.get("ticket_code"), "png");
//        String image_encoded =  new String(Base64.getEncoder().encode(image ));
//        content.put("img", image_encoded);
        String html = ContentUtil.parseThymeleafTemplate(content, "templates/ticket-information.html");
        byte[] pdf = ContentUtil.htmlToPdf(html);
        return  pdf;
    }
    public void sendTicketInformation(User userSendRequest, ResPaidBooking paidBooking) {
        System.out.println("Sending ticket");
        HashMap<String, Object> content = paidBooking.toMap();
        content.put("name", userSendRequest.getDisplayName());
        try {
            ReqAttachmentFile ticketPdf = new ReqAttachmentFile(ReqAttachmentFile.FileType.PDF, "ticket.pdf", generatePdfTicket(content));

            mailProcess.sendMail(new ReqSendMail(paidBooking.getEmail(),
                    "Thông tin vé của bạn",
                    "Tickme-noreply",
                    userSendRequest.getDisplayName(),
                    "Chúc mừng bạn đã đăng ký thành công vé của sự kiện " + paidBooking.getEvent().getName(), ticketPdf), "Send tickets email");
        } catch (IOException | DocumentException | SchedulerException | WriterException e) {
            e.printStackTrace();
        }
    }
    public ResBooking getBookingDetail(HttpServletRequest httpRequest, String bookingId) throws BookingNotFoundException, UnAuthorException {
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User user = userDAO.findByEmail(emailSendRequest);
        Booking booking = bookingDAO.findById(bookingId).orElseThrow(BookingNotFoundException::new);
        if (booking.getCreatedBy().equals(user.getId())){
            if (booking.getStatus() == BookingStatus.SUCCEED){
                List<TicketCode> ticketCodes = ticketCodeDAO.getTicketCodeByBooking(bookingId);
                return new ResPaidBooking(booking, ticketCodes);
            }
            else if(booking.getStatus() == BookingStatus.RESERVED){
                List<BookingDetail> bookingDetails = bookingDetailDAO.findByBooking(booking);
                List<ResBookingDetail> resBookingDetails = bookingDetails.stream().map(b-> new ResBookingDetail(b.getTicketClass().getName(), b.getTicketClass().getPrice(), b.getQuantity())).collect(Collectors.toList());
                return new ResUnpaidBooking(booking, resBookingDetails);
            }
            else {
                return new ResBooking(booking);
            }
        }
        else{
            throw new UnAuthorException();
        }
    }
    public void vnPayIpn(HttpServletRequest request){
        finishPayment(new VnPayIPN(request.getParameter("vnp_ResponseCode"), request.getParameter("vnp_TxnRef")));
    }
}
