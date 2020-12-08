package uet.japit.k62.models.response.data_response;

import com.google.zxing.WriterException;
import lombok.AllArgsConstructor;
import lombok.Data;
import uet.japit.k62.util.ContentUtil;

import java.io.IOException;
import java.util.Base64;

@AllArgsConstructor
@Data
public class ResTicketCode {
    private String code;
    private String name;
    private String qr;

    public ResTicketCode(String code, String name) {
        this.code = code;
        this.name = name;
        try {
            this.qr ="data:image/png;base64," + new String(Base64.getEncoder().encode(ContentUtil.generateQRCode(code, "png")));
        } catch (IOException | WriterException e) {
            e.printStackTrace();
        }
//        qr = code;
    }

}
