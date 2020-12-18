package uet.japit.k62.models.request;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
public class ReqSelectedTicket {
    @NotNull
    private String ticket_id;
    @Positive
    private int amount;
}
