package uet.japit.k62.models.response.data_response;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ResTicketClass {
    private String name;
    private BigDecimal price;
    private Integer numberAvailable;
    private Integer total;
    private String description;
    private Integer minPerPerson;
    private Integer maxPerPerson;
    private String eventId;
}
