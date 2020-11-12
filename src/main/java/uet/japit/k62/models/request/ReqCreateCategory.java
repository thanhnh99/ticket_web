package uet.japit.k62.models.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class ReqCreateCategory {
    @NotNull(message = "categoryName may not be null")
    @NotBlank(message = "categoryName may not be blank")
    @NotEmpty(message = "categoryName may not be empty")
    private String categoryName;
}
