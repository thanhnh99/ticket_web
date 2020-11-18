package uet.japit.k62.exception.exception_handle;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.constant.StatusCode;
import uet.japit.k62.exception.exception_define.detail.InvalidConditionException;
import uet.japit.k62.exception.exception_define.detail.NotUpdateSelfPermissionException;
import uet.japit.k62.models.response.http_response.MessageResponse;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class VoucherApiExceptionHandel {
    @ExceptionHandler(InvalidConditionException.class)
    @ResponseStatus(value = HttpStatus.OK)
    public MessageResponse handelInvalidConditionException() {
        return new MessageResponse(StatusCode.BAD_REQUEST, MessageConstant.INVALID_CONDITION);
    }
}
