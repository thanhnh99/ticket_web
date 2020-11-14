package uet.japit.k62.models.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
public class ReqBookingSelectTicket {
//    @NotNull
//    @NotBlank
//    @NotEmpty
//    private String eventId;
    @NotEmpty
    private List<ReqSelectedTicket> tickets;
    private String voucher;
    @NotEmpty
    @Email
    private String email;
    @NotEmpty
    private String phone;
}
