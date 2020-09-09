package uet.japit.k62.models.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Booking extends BaseEntity{
    private Integer totalTicket;


    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;
}
