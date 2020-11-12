package uet.japit.k62.models.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqLogin {
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
