package uet.japit.k62.models.response.data_response;


import lombok.Data;
import uet.japit.k62.models.entity.Event;

import java.util.Collection;
import java.util.Date;

@Data
public class ResEvent {
    private String name;
    private String description;
    private String coverImageUrl;
    private String mapImageUrl;
    private Date startTime;
    private Date endTime;
    private Date startSellingTime;
    private Date endSellingTime;
    private Boolean isPopular;
    private Boolean isBroadcasting;
    private String categoryId;


    public ResEvent(Event event)
    {
        this.name = event.getName();
        this.description = event.getDescription();
        this.coverImageUrl = event.getCoverImageUrl();
        this.mapImageUrl = event.getMapImageUrl();
        this.startSellingTime = event.getStartSellingTime();
        this.startTime = event.getStartTime();
        this.endTime = event.getEndTime();
        this.endSellingTime = event.getEndSellingTime();
        this.isPopular = event.getIsPopular();
        this.isBroadcasting = event.getIsBroadcasting();
        this.categoryId = event.getCategory().getId();
    }
}
