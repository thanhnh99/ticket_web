package uet.japit.k62.models.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@AllArgsConstructor
public class TicketCode {
    private String code;
    @ManyToOne
    @JoinColumn(name = "booking_id")
    private BookingDetail booking;
}
