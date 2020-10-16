package uet.japit.k62.models.request;


import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.Multipart;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
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
    private Long startTime;

    @NotNull(message = "endTime may not be null")
    private Long endTime;

    @NotNull(message = "startSellingTime may not be null")
    private Long startSellingTime;

    @NotNull(message = "endSellingTime may not be null")
    private Long endSellingTime;

    @NotBlank(message = "categoryId may not be blank")
    @NotNull(message = "categoryId may not be null")
    @NotEmpty(message = "categoryId may not be empty")
    private String categoryId;

    @NotBlank(message = "city may not be blank")
    @NotNull(message = "city may not be null")
    @NotEmpty(message = "city may not be empty")
    private String city;

    @NotBlank(message = "fullAddress may not be blank")
    @NotNull(message = "fullAddress may not be null")
    @NotEmpty(message = "fullAddress may not be empty")
    private String fullAddress;
}
