package uet.japit.k62.exception.exception_handle;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.constant.StatusCode;
import uet.japit.k62.exception.exception_define.common.EntityNotFoundException;
import uet.japit.k62.exception.exception_define.detail.*;
import uet.japit.k62.models.response.http_response.MessageResponse;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class UserApiExceptionHandle{
    @ExceptionHandler(WrongEmailOrPasswordException.class)
    @ResponseStatus(value = HttpStatus.OK)
    public MessageResponse WrongEmailOrPasswordExceptionHandle() {
        return new MessageResponse(StatusCode.NOT_FOUND, MessageConstant.WRONG_EMAIL_OR_PASSWORD);
    }

    @ExceptionHandler(NotUpdateSelfPermissionException.class)
    @ResponseStatus(value = HttpStatus.OK)
    public MessageResponse NotUpdateSelfPermissionExceptionHandle() {
        return new MessageResponse(StatusCode.BAD_REQUEST, MessageConstant.CANT_SELF_UPDATE_PERMISSION);
    }
}
