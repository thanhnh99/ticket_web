package uet.japit.k62.models.response.data_response;

import lombok.Data;
import uet.japit.k62.models.entity.Booking;
import uet.japit.k62.models.entity.BookingStatus;

import java.math.BigDecimal;
@Data
public class ResBooking {
    private String bookingId;
    private String email;
    private String phone;
    private BookingStatus status;
    private BigDecimal price;
    private ResEvent event;
    public ResBooking(Booking booking){
        this.bookingId = booking.getId();
        email = booking.getEmailBooking();
        phone = booking.getPhoneBooking();
        status = booking.getStatus();
        price = booking.getPrice();
        event = new ResEvent(booking.getEvent());
    }
}
