package uet.japit.k62.models.response.http_response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HttpResponse<T>{
    private Integer statusCode;
    private String message;
    private T data;
}