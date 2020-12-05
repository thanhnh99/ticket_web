package uet.japit.k62.models.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ReqSendMail {
    private static String domainName = "@huent.me";
    private String sendTo;
    private String subject;
    private String from;
    private String receiverName;
    private String htmlContent;

    public ReqSendMail(String sendTo,  String subject, String from, String receiverName, String htmlContent) {
        this.sendTo = sendTo;
        this.subject = subject;
        this.from = from +  domainName;
        this.receiverName = receiverName;
        this.htmlContent = htmlContent;
    }
    public void setFrom(String from) {
        this.from = from +  domainName;
    }
}
