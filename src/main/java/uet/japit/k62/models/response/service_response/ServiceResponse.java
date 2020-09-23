package uet.japit.k62.models.response.service_response;

import lombok.Data;

@Data
public class ServiceResponse<T> {
    public Boolean status = false;
    public String message;
    public T data;

    public boolean isSuccess()
    {
        return this.status;
    }

}
