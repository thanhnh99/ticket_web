package uet.japit.k62.service.payment;

import com.google.common.hash.Hashing;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.env.Environment;
import org.springframework.web.client.RestTemplate;
import uet.japit.k62.exception.exception_define.detail.PaymentCreateRequestException;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.*;

public class VnPayPayment implements IPayment {
    private final RestTemplate restTemplate;
    private String BASE_URL;
    private String secretKey;
    private String merchantId;
    private String returnUrl = "%s/finish";
    private String notifyUrl = "vnpay/payment-notification";
//    String publicKey;
    String privateKey;

    public VnPayPayment(RestTemplateBuilder restTemplateBuilder, Environment env, String baseUrl) {
        restTemplate = restTemplateBuilder.setConnectTimeout(Duration.ofSeconds(500))
                .setReadTimeout(Duration.ofSeconds(500))
                .build();;
        this.BASE_URL = env.getProperty("vnpay.base-url");
        this.secretKey = env.getProperty("vnpay.secret-key");
        this.merchantId = env.getProperty("vnpay.merchantid");
//        this.publicKey = env.getProperty("momo.public-key");
//        this.privateKey = env.getProperty("momo.private-key");
        returnUrl = baseUrl + returnUrl;
        notifyUrl = baseUrl + notifyUrl;
    }

    @Override
    public String createPaymentRequest(String requestId, long amount, String userEmail) throws PaymentCreateRequestException {
        String notifyUrl = this.notifyUrl;
        String returnUrl = String.format(this.returnUrl, requestId);
        String vnp_Version = "2.0.0";
        String vnp_Command = "pay";
        String vnp_OrderInfo = "ticket-web payment";
        String orderType = "19000";
        String vnp_TxnRef = requestId;
        String vnp_IpAddr = "192.168.11.21";

        String vnp_TmnCode = "TPQ926K9";

        String vnp_TransactionNo = vnp_TxnRef;
        String vnp_hashSecret = "DSATEEHIRQKVVGFENKUGSLHSEIWPUWDR";
        amount = amount * 100;
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        String bank_code = "NCB";
        vnp_Params.put("vnp_BankCode", bank_code);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.put("vnp_OrderType", orderType);

        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl",returnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Date dt = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String dateString = formatter.format(dt);
        String vnp_CreateDate = dateString;
        String vnp_TransDate = vnp_CreateDate;
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        //Build data to hash and querystring
        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(fieldValue);
                //Build query
                try {
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                query.append('=');
                try {
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }

                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = Hashing.sha256().hashString(vnp_hashSecret + hashData.toString(), StandardCharsets.UTF_8).toString();
        queryUrl += "&vnp_SecureHashType=SHA256&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = BASE_URL  + "vpcpay.html?" + queryUrl;
//        Map<String, Object> response = this.restTemplate.getForObject(paymentUrl, Map.class);
        return  paymentUrl;
    }
}
