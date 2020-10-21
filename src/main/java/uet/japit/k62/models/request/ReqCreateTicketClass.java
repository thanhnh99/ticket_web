package uet.japit.k62.models.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

@Data
public class ReqCreateTicketClass {

    @NotBlank
    private String name;

    @NotBlank
    private BigDecimal price;

    @NotBlank
    private Integer total;

    @NotBlank
    private String description;

    @NotBlank
    private Integer minPerPerson;

    @NotBlank
    private Integer maxPerPerson;

    @NotBlank
    private String eventId;
}
