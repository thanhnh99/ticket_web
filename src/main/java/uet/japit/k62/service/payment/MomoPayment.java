package uet.japit.k62.service.payment;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import uet.japit.k62.exception.exception_define.detail.PaymentCreateRequestException;
import uet.japit.k62.util.Encoder;

import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
@Service
public class MomoPayment implements IPayment {
    private final RestTemplate restTemplate;
    private String BASE_URL;
    private String accessKey;
    private String partnerCode;
    private String returnUrl = "%s/%s/finish";
    private String notifyUrl = "%s/%s/payment-notification";
    String publicKey;
    String privateKey;
    public MomoPayment(RestTemplateBuilder restTemplateBuilder, Environment env) {
        restTemplate = restTemplateBuilder.setConnectTimeout(Duration.ofSeconds(500))
                                            .setReadTimeout(Duration.ofSeconds(500))
                                            .build();;
        this.BASE_URL = env.getProperty("momo.base-url");
        this.accessKey = env.getProperty("momo.access-key");
        this.partnerCode = env.getProperty("momo.partner-code");
        this.publicKey = env.getProperty("momo.public-key");
        this.privateKey = env.getProperty("momo.private-key");
    }
    @Override
    public String createPaymentRequest(String requestId, long amount, String userEmail) throws PaymentCreateRequestException {
        String hostBase = "";
        try {
            hostBase = InetAddress.getLocalHost().getHostName();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        String notifyUrl = String.format(this.notifyUrl, hostBase, requestId);
        String returnUrl = String.format(this.returnUrl, hostBase, requestId);
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
        Map<String, Object> response = this.restTemplate.postForObject(url, entity, Map.class);
        if((Integer) response.get("errorCode") == 0){
            return response.get("payUrl").toString();
        }
        else {
            throw new PaymentCreateRequestException(response.get("localMessage").toString());
        }
    }
}
