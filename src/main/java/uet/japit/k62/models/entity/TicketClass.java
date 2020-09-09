package uet.japit.k62.models.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.math.BigDecimal;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TicketClass extends BaseEntity{
    private String name;
    private BigDecimal price;
    private Integer numberAvailable;
    private Integer total;
    private String description;
    private Integer minPerPerson;
    private Integer maxPerPerson;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;
}
