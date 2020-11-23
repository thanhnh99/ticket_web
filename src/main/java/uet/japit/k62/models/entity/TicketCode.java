package uet.japit.k62.models.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@AllArgsConstructor
@Entity
@EnableAutoConfiguration
public class TicketCode {
    @Id
    private String code;
    @ManyToOne
    @JoinColumn(name = "booking_id")
    private BookingDetail booking;
}
