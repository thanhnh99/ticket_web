package uet.japit.k62.exception.exception_define;

import lombok.Data;

@Data
public class SuccessDataReturn extends RuntimeException{

    private Object data;
    public SuccessDataReturn(Object data)
    {
        super();
        this.data = data;
    }
}
