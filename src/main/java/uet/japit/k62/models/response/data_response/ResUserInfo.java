package uet.japit.k62.models.response.data_response;

import lombok.Data;
import uet.japit.k62.models.entity.User;
@Data
public class ResUserInfo {
    private String phone;
    private String displayName;
    private String bankAccountName;
    private String bankAccountNumber;
    private String bankName;
    private String bankBranchName;

    public ResUserInfo(User user)
    {
        this.phone = user.getPhone();
        this.displayName = user.getDisplayName();
        this.bankAccountName = user.getBankAccountHolder();
        this.bankAccountNumber = user.getBankAccountNumber();
        this.bankName = user.getBankName();
        this.bankBranchName = user.getBankBranch();
    }
}
