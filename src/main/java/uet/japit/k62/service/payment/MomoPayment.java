package uet.japit.k62.service.payment;

import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import uet.japit.k62.exception.exception_define.detail.PaymentCreateRequestException;
import uet.japit.k62.util.Encoder;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class MomoPayment implements IPayment {
    private final RestTemplate restTemplate;
    @Value("${momo.base-url}")
    private String BASE_URL;
    @Value("${access-key}")
    private String accessKey;
    @Value("${partner-code}")
    private String partnerCode;
    private String returnUrl = "/%s/finish";
    private String notifyUrl = "/%s/payment-notification";
    @Value("${momo.public-key}")
    String publicKey;
    @Value("${momo.private-key}")
    String privateKey;
    public MomoPayment(RestTemplateBuilder restTemplateBuilder) {
        restTemplate = restTemplateBuilder.setConnectTimeout(Duration.ofSeconds(500))
                                            .setReadTimeout(Duration.ofSeconds(500))
                                            .build();;

    }
    @Override
    public String createPaymentRequest(String requestId, long amount, String userEmail) throws PaymentCreateRequestException {
        String notifyUrl = String.format(this.notifyUrl, requestId);
        String returnUrl = String.format(this.returnUrl, requestId);
        HttpHeaders headers = new HttpHeaders();
        // set `content-type` header
        headers.setContentType(MediaType.APPLICATION_JSON);
        // set `accept` header
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        String url = BASE_URL + "gw_payment/transactionProcessor";
        String requestType = "captureMoMoWallet";
        Map<String, Object> map = new HashMap<>();
        map.put("accessKey", accessKey);
        map.put("partnerCode", partnerCode);
        map.put("requestType", requestType);
        map.put("notifyUrl", notifyUrl);
        map.put("returnUrl", returnUrl);
        map.put("orderId", requestId);
        map.put("amount", amount + "");
        map.put("requestId", requestId);
        map.put("orderInfo", "ticketweb_payment");
        map.put("extraData", "email=" +  userEmail);
        String encode_data = "partnerCode=" + partnerCode +
                "&accessKey=" + accessKey +
                "&requestId=" + requestId +
                "&amount=" + amount +
                "&orderId=" + requestId +
                "&orderInfo=ticketweb_payment" +
                "&returnUrl=" + returnUrl +
                "&notifyUrl=" + notifyUrl +
                "&extraData=email=" +  userEmail ;
        try {
            map.put("signature", Encoder.signHmacSHA256(encode_data, privateKey));
        }catch (UnsupportedEncodingException | NoSuchAlgorithmException | InvalidKeyException e) {
            e.printStackTrace();
        }
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(map, headers);
        ResponseEntity<JsonObject> response = this.restTemplate.postForEntity(url, entity, JsonObject.class);
        if(response.getBody().get("errorCode").getAsInt() == 0){

            return response.getBody().get("payUrl").getAsString();
        }
        else {
            throw new PaymentCreateRequestException(response.getBody().get("localMessage").getAsString());
        }
    }

    @Override
    public void verifyPayment() {

    }
}
