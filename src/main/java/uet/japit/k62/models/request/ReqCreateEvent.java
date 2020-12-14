package uet.japit.k62.models.request;


import lombok.Data;

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
    private Date startTime;

    @NotNull(message = "endTime may not be null")
    private Date endTime;

    @NotNull(message = "startSellingTime may not be null")
    private Date startSellingTime;

    @NotNull(message = "endSellingTime may not be null")
    private Date endSellingTime;

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

    @NotBlank(message = "contactPhone may not be blank")
    @NotNull(message = "contactPhone may not be null")
    @NotEmpty(message = "contactPhone may not be empty")
    private String contactPhone;

    @NotBlank(message = "contactEmail may not be blank")
    @NotNull(message = "contactEmail may not be null")
    @NotEmpty(message = "contactEmail may not be empty")
    private String contactEmail;

    @NotBlank(message = "organizerName may not be blank")
    @NotNull(message = "organizerName may not be null")
    @NotEmpty(message = "organizerName may not be empty")
    private String organizerName;

    @NotBlank(message = "organizerInfo may not be blank")
    @NotNull(message = "organizerInfo may not be null")
    @NotEmpty(message = "organizerInfo may not be empty")
    private String organizerInfo;
}
