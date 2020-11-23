package uet.japit.k62.models.response.data_response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uet.japit.k62.models.entity.Event;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResHomeEvent {
    private String id;
    private String name;
    private Date startTime;
    private String coverImageUrl;

    public ResHomeEvent(Event event)
    {
        this.id = event.getId();
        this.name = event.getName();
        this.coverImageUrl = event.getCoverImageUrl();
        this.startTime = event.getStartTime();
    }
}
