package uet.japit.k62.models.response.data_response.payment;

import lombok.Data;
import uet.japit.k62.models.request.payment.MomoIPN;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

@Data
public class ResMomoIPN {
    private String partnerCode;
    private String accessKey;
    private String requestId;
    private String orderId;
    private int errorCode;
    private String message;;
    private String responseTime;
    private String extraData;
    private String signature;

    public ResMomoIPN(MomoIPN req) {
        this.accessKey = req.getAccessKey();
        this.partnerCode = req.getPartnerCode();
        this.requestId = req.getRequestId();
        this.orderId = req.getOrderId();
        this.extraData = req.getExtraData();
        this.errorCode = 0;
        this.message = "success";
        SimpleDateFormat formatter = new SimpleDateFormat("YYYY-MM-DD HH:mm:ss");
        formatter.setTimeZone(TimeZone.getTimeZone("GMT +7"));
        this.responseTime = formatter.format(new Date());
        this.signature = "partnerCode=" + partnerCode +
                        "&accessKey=" + accessKey + "&requestId=" + requestId +
                        "&orderId=" + orderId + "&errorCode=" + errorCode + "&message=" +message +
                        "&responseTime=" + responseTime + "&extraData= "+ extraData;
    }
}
