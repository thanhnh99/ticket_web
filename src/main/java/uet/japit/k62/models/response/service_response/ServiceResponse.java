package uet.japit.k62.models.response.service_response;

import lombok.Data;
import org.springframework.http.ResponseEntity;
import uet.japit.k62.constant.StatusCode;
import uet.japit.k62.models.response.http_response.HttpResponse;

@Data
public class ServiceResponse<T> {
    public Boolean status = false;
    public String message;
    public T data;

    public boolean isSuccess()
    {
        return this.status;
    }

    public static ResponseEntity<HttpResponse> getHttpResponseResponseEntity(HttpResponse responseData, ServiceResponse serviceResponse) {
        responseData.setMessage(serviceResponse.getMessage());
        responseData.setData(serviceResponse.getData());
        if(serviceResponse.isSuccess())
        {
            responseData.setStatusCode(StatusCode.OK);
        }
        else
        {
            responseData.setStatusCode(StatusCode.BAD_REQUEST);
        }
        return ResponseEntity.status(responseData.getStatusCode()).body(responseData);
    }

}
