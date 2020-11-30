package uet.japit.k62.models.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReqSendMail {
    private String sendTo;
    private String content;
    private String subject;
}
