package uet.japit.k62.models.request;

import lombok.Data;

@Data
public class ReqChangeAccountType {
    private String userId;
    private String accountType;
}
