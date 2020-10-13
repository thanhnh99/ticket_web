package uet.japit.k62.models.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class ReqRegister {
    @NotNull(message = "displayName may not be null")
    private String displayName;

    @NotBlank(message = "email may not be blank")
    @NotNull(message = "email may not be null")
    @NotEmpty(message = "email may not be empty")
    @Email(message = "email type is required")
    private String email;

    @NotBlank(message = "password may not be blank")
    @NotNull(message = "password may not be null")
    @NotEmpty(message = "password may not be empty")
    private String password;
}
