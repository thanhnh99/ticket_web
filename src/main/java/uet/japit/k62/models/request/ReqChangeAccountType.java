package uet.japit.k62.models.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class ReqChangeAccountType {
    @NotBlank(message = "userId may not be blank")
    @NotNull(message = "userId may not be null")
    @NotEmpty(message = "userId may not be empty")
    private String userId;


    @NotNull(message = "accountType may not be null")
    private String accountType;
}
