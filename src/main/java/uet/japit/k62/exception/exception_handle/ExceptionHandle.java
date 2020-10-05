package uet.japit.k62.exception.exception_handle;


import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.constant.StatusCode;
import uet.japit.k62.exception.exception_define.SuccessDataReturn;
import uet.japit.k62.exception.exception_define.SuccessMessage;
import uet.japit.k62.models.response.http_response.HttpResponse;
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

    /**
     * Xử lí data trả về khi thực hiện thành công tại đây.
     * @return
     */
    @ExceptionHandler(SuccessMessage.class)
    @ResponseStatus(value = HttpStatus.OK)
    public MessageResponse handleSuccessMessage() {
        // quá trình kiểm soat lỗi diễn ra ở đây
        return new MessageResponse(StatusCode.OK, MessageConstant.SUCCESS);
    }

    @ExceptionHandler(SuccessDataReturn.class)
    @ResponseStatus(value = HttpStatus.OK)
    public HttpResponse handleDataReturnSuccess(SuccessDataReturn ex) {
        // quá trình kiểm soat lỗi diễn ra ở đây
        return new HttpResponse(StatusCode.OK, MessageConstant.SUCCESS, ex.getData());
    }
}
