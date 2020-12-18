package uet.japit.k62.models.request.payment;

import lombok.Data;
import uet.japit.k62.util.Encoder;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Data
public class MomoIPN extends IPN {
    private static final String privateKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
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
        String encode_data = "partnerCode=" + partnerCode +
                "&accessKey=" + accessKey +
                "&requestId=" + requestId +
                "&amount=" + amount +
                "&orderId=" + orderId +
                "&orderInfo=" + orderInfo +
                "&orderType=" + orderType +
                "&transId=" + transId +
                "&errorCode=" + errorCode +
                "&message=" + message +
                "&localMessage=" + localMessage +
                "&payType=" + payType +
                "&responseTime=" + responseTime +
                "&extraData=" + extraData ;
        try {
           String encoded_data = Encoder.signHmacSHA256(encode_data, privateKey);
           return encode_data.equals(signature);
        } catch (NoSuchAlgorithmException | InvalidKeyException | UnsupportedEncodingException e) {
            e.printStackTrace();
        }
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
