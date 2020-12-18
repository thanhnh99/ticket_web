package uet.japit.k62.models.response.http_response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.constant.StatusCode;

@Data
@NoArgsConstructor
public class HttpResponse<T> extends MessageResponse {
    private T data;


    public HttpResponse(Integer statusCode, String message, T data)
    {
        super(statusCode,message);
        this.data = data;
    }
    public HttpResponse(T data)
    {
        super(StatusCode.OK, MessageConstant.SUCCESS);
        this.data = data;
    }
}