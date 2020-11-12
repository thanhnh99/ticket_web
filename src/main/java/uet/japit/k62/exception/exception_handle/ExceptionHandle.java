package uet.japit.k62.exception.exception_handle;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.constant.StatusCode;
import uet.japit.k62.exception.exception_define.common.EntityHasDisableException;
import uet.japit.k62.exception.exception_define.common.EntityHasExistedException;
import uet.japit.k62.exception.exception_define.common.EntityNotFoundException;
import uet.japit.k62.exception.exception_define.common.UnAuthorException;
import uet.japit.k62.models.response.http_response.MessageResponse;

import java.util.NoSuchElementException;

@RestControllerAdvice
//@Order(Ordered.LOWEST_PRECEDENCE)
public class ExceptionHandle {
    /**
     * Tất cả các Exception không được khai báo sẽ được xử lý tại đây
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public MessageResponse handleAllException(Exception exception) {
        // quá trình kiểm soat lỗi diễn ra ở đây
        return new MessageResponse(StatusCode.BAD_REQUEST, exception.getMessage());
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public MessageResponse NoSuchElementExceptionHandle() {
        // quá trình kiểm soat lỗi diễn ra ở đây
        return new MessageResponse(StatusCode.BAD_REQUEST, MessageConstant.NO_SUCH_ELEMENT_EXCEPTION);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public MessageResponse EntityNotFoundExceptionHandle(EntityNotFoundException e) {
        return new MessageResponse(StatusCode.NOT_FOUND, e.getMessage());
    }


    @ExceptionHandler(EntityHasDisableException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public MessageResponse EntityHasDisableExceptionHandle(EntityHasDisableException e) {
        return new MessageResponse(StatusCode.BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(EntityHasExistedException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public MessageResponse EntityHasExistedExceptionHandle(EntityHasExistedException e) {
        return new MessageResponse(StatusCode.BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(UnAuthorException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public MessageResponse UnAuthorExceptionHandle(UnAuthorException e) {
        return new MessageResponse(StatusCode.UN_AUTHORIZATION, e.getMessage());
    }
}
