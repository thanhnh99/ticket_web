package uet.japit.k62.models.request;

import lombok.Data;

import java.util.List;

@Data
public class ReqChangePermission {
    private String userId;
    private List<String> permissionCodeList;
}
