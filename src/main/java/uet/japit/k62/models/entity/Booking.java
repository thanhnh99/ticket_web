package uet.japit.k62.models.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Booking extends BaseEntity{
    private Integer totalTicket;

    private BookingStatus status;

    private String emailBooking;

    private String phoneBooking;
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    private Collection<BookingDetail> bookingDetailList = new ArrayList<BookingDetail>();
}
