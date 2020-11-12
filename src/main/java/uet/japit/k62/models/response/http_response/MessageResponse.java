package uet.japit.k62.models.response.http_response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.constant.StatusCode;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {
    private Integer statusCode = StatusCode.OK;
    private String message = MessageConstant.SUCCESS;
}
