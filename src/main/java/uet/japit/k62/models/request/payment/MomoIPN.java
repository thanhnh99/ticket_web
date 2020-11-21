package uet.japit.k62.models.request.payment;

import lombok.Data;

@Data
public class MomoIPN extends IPN {
    private String partnerCode;
    private String accessKey;
    private String requestId;
    private String amount;
    private String orderId;
    private String orderInfo;
    private String orderType;
    private String transId;
    private int errorCode;
    private String message;
    private String localMessage;
    private String payType;
    private String responseTime;
    private String extraData;
    private String signature;
    private boolean verifyPayment(){
        // TODO: fill up
        return  true;
    }
    @Override
    public boolean isSuccess() {
        return verifyPayment() && errorCode == 0;
    }

    @Override
    public String getBookingId() {
        return orderId;
    }

}
