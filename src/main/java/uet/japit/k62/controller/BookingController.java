package uet.japit.k62.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.constant.StatusCode;
import uet.japit.k62.exception.exception_define.detail.*;
import uet.japit.k62.models.request.ReqBookingSelectTicket;
import uet.japit.k62.models.request.ReqCheckout;
import uet.japit.k62.models.request.payment.MomoIPN;
import uet.japit.k62.models.response.data_response.ResBooking;
import uet.japit.k62.models.response.data_response.ResTicketClass;
import uet.japit.k62.models.response.data_response.payment.ResMomoCheckout;
import uet.japit.k62.models.response.data_response.payment.ResMomoIPN;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.service.BookingService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/booking")
public class BookingController {
    @Autowired
    private BookingService bookingService;
    @GetMapping("/{event_id}/select-ticket")
    public ResponseEntity getByEvent(@PathVariable(value = "event_id") String event_id) {
        HttpResponse<List<ResTicketClass>> responseData = new HttpResponse<>(StatusCode.OK, MessageConstant.SUCCESS,
                bookingService.getTicketInfo(event_id));
        return ResponseEntity.ok(responseData);
    }
    @PostMapping("/{event_id}/select-ticket")
    public ResponseEntity selectTickets(HttpServletRequest httpServletRequest, @RequestBody ReqBookingSelectTicket reqSelectedTicket, @PathVariable(value = "event_id") String event_id) throws MaximumTicketExceeded, MinimumTicketNotReached, InvalidVoucherException, EventNotFoundException, VoucherNotFoundException, TicketNotFoundException {
        HttpResponse<ResBooking> response = new HttpResponse<>(StatusCode.OK, MessageConstant.SUCCESS,
                bookingService.selectTickets(httpServletRequest, reqSelectedTicket, event_id));
        return ResponseEntity.ok(response);
    }
    @PostMapping("/{booking_id}/checkout")
    public ResponseEntity checkout(@PathVariable(value = "booking_id") String booking_id, @RequestBody ReqCheckout reqCheckout, HttpServletRequest request) throws InvalidPaymentException, BookingNotFoundException, PaymentTypeNotSupported, PaymentCreateRequestException {
        String baseUrl = String.format("%s://%s:%d/booking/",request.getScheme(),  request.getServerName(), request.getServerPort());
        String payUrl = bookingService.checkout(booking_id, reqCheckout.getType(), baseUrl);
        ResMomoCheckout resMomoCheckout = new ResMomoCheckout(payUrl);
        return ResponseEntity.ok(new HttpResponse<ResMomoCheckout>(StatusCode.OK, MessageConstant.SUCCESS, resMomoCheckout));
    }
    @PostMapping(path = "/{booking_id}/payment-notification",
    consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    public ResponseEntity notifyPayment(MomoIPN reqIPN){
        System.out.println("payment notification");
        bookingService.finishPayment(reqIPN);
        ResMomoIPN resMomoIPN = new ResMomoIPN(reqIPN);
        System.out.println("success payment: "+  reqIPN);
        return ResponseEntity.ok(resMomoIPN);
    }
    @GetMapping("/my-booking")
    public  ResponseEntity getMyBooking(HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(bookingService.getMyBooking(httpServletRequest));
    }
}
