package uet.japit.k62.models.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class ReqBookingSelectTicket {
    @NotNull
    @NotBlank
    @NotEmpty
    private String eventId;
    @NotEmpty
    private List<ReqSelectedTicket> tickets;
    private String voucher;
    private String email;
    private String phone;
}
