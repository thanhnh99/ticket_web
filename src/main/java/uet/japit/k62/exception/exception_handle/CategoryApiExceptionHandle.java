package uet.japit.k62.exception.exception_handle;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.constant.StatusCode;
import uet.japit.k62.exception.exception_define.CategoryHasExistedException;
import uet.japit.k62.exception.exception_define.CategoryNotFoundException;
import uet.japit.k62.models.response.http_response.MessageResponse;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CategoryApiExceptionHandle extends ExceptionHandle{
    @ExceptionHandler(CategoryHasExistedException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public MessageResponse AccountWasLockedExceptionHandle() {
        return new MessageResponse(StatusCode.BAD_REQUEST, MessageConstant.CATEGORY_HAS_EXISTED);
    }

    @ExceptionHandler(CategoryNotFoundException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public MessageResponse CategoryNotFoundExceptionHandle() {
        return new MessageResponse(StatusCode.BAD_REQUEST, MessageConstant.CATEGORY_NOT_FOUND);
    }
}
