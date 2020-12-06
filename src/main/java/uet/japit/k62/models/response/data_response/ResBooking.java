package uet.japit.k62.models.response.data_response;

import lombok.Data;
import uet.japit.k62.models.entity.Booking;
import uet.japit.k62.models.entity.BookingStatus;
import uet.japit.k62.models.entity.Event;

import java.math.BigDecimal;
import java.util.HashMap;
@Data
public class ResBooking {
    private String bookingId;
    private String email;
    private String phone;
    private BookingStatus status;
    private BigDecimal price;
    private Event event;
    public ResBooking(Booking booking){
        this.bookingId = booking.getId();
        email = booking.getEmailBooking();
        phone = booking.getPhoneBooking();
        status = booking.getStatus();
        price = booking.getPrice();
        event = booking.getEvent();
    }
    public HashMap<String, String > toMap(){
        HashMap<String, String> mapper = new HashMap<>();
        mapper.put("event_name", event.getName());
        mapper.put("event_time", event.getStartTime().toString());
        return mapper;
    }
}
