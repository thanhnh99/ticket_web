package uet.japit.k62.models.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TicketCode extends BaseEntity{
    private String code;
    @ManyToOne
    @JoinColumn(name = "booking_id")
    private BookingDetail booking;
}
