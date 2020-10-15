package uet.japit.k62.models.request;


import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.Multipart;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.Date;

@Data
public class ReqCreateEvent {
    @NotBlank(message = "name may not be blank")
    @NotNull(message = "name may not be null")
    @NotEmpty(message = "name may not be empty")
    private String name;

    @NotBlank(message = "description may not be blank")
    @NotNull(message = "description may not be null")
    @NotEmpty(message = "description may not be empty")
    private String description;

    @NotNull(message = "startTime may not be null")
    private String startTime;

    @NotNull(message = "endTime may not be null")
    private String endTime;

    @NotNull(message = "startSellingTime may not be null")
    private String startSellingTime;

    @NotNull(message = "endSellingTime may not be null")
    private String endSellingTime;

    @NotBlank(message = "categoryId may not be blank")
    @NotNull(message = "categoryId may not be null")
    @NotEmpty(message = "categoryId may not be empty")
    private String categoryId;

    @NotNull(message = "locationList may not be null")
    private Collection<ReqCreateLocation> locationList;

    @NotNull(message = "ticketClassList may not be null")
    private Collection<ReqCreateTicketClass> ticketClassList;
}
