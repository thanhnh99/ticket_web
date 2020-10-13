package uet.japit.k62.models.request;


import lombok.Data;

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

    @NotBlank(message = "coverImageUrl may not be blank")
    @NotNull(message = "coverImageUrl may not be null")
    @NotEmpty(message = "coverImageUrl may not be empty")
    private String coverImageUrl;

    @NotBlank(message = "mapImageUrl may not be blank")
    @NotNull(message = "mapImageUrl may not be null")
    @NotEmpty(message = "mapImageUrl may not be empty")
    private String mapImageUrl;

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

    @NotNull(message = "locationList may not be null")
    private Collection<String> locationList;
}
