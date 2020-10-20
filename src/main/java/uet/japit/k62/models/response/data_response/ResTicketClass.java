package uet.japit.k62.models.response.data_response;

import lombok.Data;
import uet.japit.k62.models.entity.TicketClass;

import java.math.BigDecimal;

@Data
public class ResTicketClass {
    private String id;
    private String name;
    private BigDecimal price;
    private Integer numberAvailable;
    private Integer total;
    private String description;
    private Integer minPerPerson;
    private Integer maxPerPerson;

    public ResTicketClass(TicketClass ticketClassEntity)
    {
        this.id = ticketClassEntity.getId();
        this.name = ticketClassEntity.getName();
        this.price = ticketClassEntity.getPrice();
        this.numberAvailable = ticketClassEntity.getNumberAvailable();
        this.total = ticketClassEntity.getTotal();
        this.description = ticketClassEntity.getDescription();
        this.minPerPerson = ticketClassEntity.getMinPerPerson();
        this.maxPerPerson = ticketClassEntity.getMaxPerPerson();
    }
}
