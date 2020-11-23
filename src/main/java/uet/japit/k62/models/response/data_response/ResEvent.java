package uet.japit.k62.models.response.data_response;


import lombok.AllArgsConstructor;
import lombok.Data;
import uet.japit.k62.models.entity.Event;
import uet.japit.k62.models.entity.TicketClass;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class ResEvent extends ResHomeEvent{
    private String description;
    private String mapImageUrl;
    private Date endTime;
    private Date startSellingTime;
    private Date endSellingTime;
    private Boolean isPopular;
    private Boolean isBroadcasting;
    private String categoryId;
    private String city;
    private String fullAddress;
    private List<ResTicketClass> ticketClassList;

    public ResEvent(Event event)
    {
        super(event);
        this.description = event.getDescription();
        this.mapImageUrl = event.getMapImageUrl();
        this.startSellingTime = event.getStartSellingTime();
        this.endTime = event.getEndTime();
        this.endSellingTime = event.getEndSellingTime();
        this.isPopular = event.getIsPopular();
        this.isBroadcasting = event.getIsBroadcasting();
        this.categoryId = event.getCategory().getId();
        this.city = event.getCity();
        this.fullAddress = event.getFullAddress();
        List<ResTicketClass> ticketClasses= new ArrayList<>();
        for(TicketClass ticketClass: event.getTicketClasses())
        {
            ticketClasses.add(new ResTicketClass(ticketClass));
        }
        this.setTicketClassList(ticketClasses);
    }
}
