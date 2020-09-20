package uet.japit.k62.models.request;

import lombok.Data;

@Data
public class ReqRegister {
    private String displayName;
    private String email;
    private String password;
}
