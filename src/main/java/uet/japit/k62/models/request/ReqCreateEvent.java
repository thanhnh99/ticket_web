package uet.japit.k62.models.request;


import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Collection;
import java.util.Date;

@Data
public class ReqCreateEvent {
    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotBlank
    private String coverImageUrl;

    @NotBlank
    private String mapImageUrl;

    @NotBlank
    private Date startTime;

    @NotBlank
    private Date endTime;

    @NotBlank
    private Date startSellingTime;

    @NotBlank
    private Date endSellingTime;

    @NotBlank
    private String categoryId;

    @NotBlank
    private Collection<String> locationList;

    @NotBlank
    private Collection<ReqCreateTicketClass> ticketClasses;
}
