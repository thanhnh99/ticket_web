package uet.japit.k62.models.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReqEditCategory {
    @NotNull(message = "name may not be null")
    @NotBlank(message = "name may not be blank")
    @NotEmpty(message = "name may not be empty")
    private String name;
}
