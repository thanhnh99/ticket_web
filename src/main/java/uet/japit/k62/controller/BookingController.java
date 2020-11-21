package uet.japit.k62.controller;

import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
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
import uet.japit.k62.models.response.data_response.payment.ResMomoIPN;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.service.BookingService;

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
    public ResponseEntity selectTickets(@RequestBody ReqBookingSelectTicket reqSelectedTicket, @PathVariable(value = "event_id") String event_id) throws MaximumTicketExceeded, MinimumTicketNotReached, InvalidVoucherException, EventNotFoundException, VoucherNotFoundException, TicketNotFoundException {
        HttpResponse<ResBooking> response = new HttpResponse<>(StatusCode.OK, MessageConstant.SUCCESS,
                bookingService.selectTickets(reqSelectedTicket, event_id));
        return ResponseEntity.ok(response);
    }
    @PostMapping("/{booking_id}/checkout")
    public ResponseEntity checkout(@PathVariable(value = "booking_id") String booking_id, @RequestBody ReqCheckout reqCheckout) throws InvalidPaymentException, BookingNotFoundException, PaymentTypeNotSupported, PaymentCreateRequestException {
        String payUrl = bookingService.checkout(booking_id, reqCheckout.getType());
        JsonObject json = new JsonObject();
        json.addProperty("payUrl", payUrl);
        return ResponseEntity.ok(new HttpResponse<JsonObject>(StatusCode.OK, MessageConstant.SUCCESS, json));
    }
    @GetMapping("/{booking_id/payment-notify")
    public ResponseEntity notifyPayment(@RequestBody MomoIPN reqIPN){
        bookingService.finishPayment(reqIPN);
        ResMomoIPN resMomoIPN = new ResMomoIPN(reqIPN);
        System.out.println("success payment: "+  reqIPN);
        return ResponseEntity.ok(resMomoIPN);
    }
}
