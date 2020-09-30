package uet.japit.k62.exception.exception_handle;


import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import uet.japit.k62.constant.StatusCode;
import uet.japit.k62.models.response.http_response.MessageResponse;

@RestControllerAdvice
@Order(Ordered.LOWEST_PRECEDENCE)
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

//    /**
//     * IndexOutOfBoundsException sẽ được xử lý riêng tại đây
//     */
//    @ExceptionHandler(IndexOutOfBoundsException.class)
//    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
//    public ErrorMessage TodoException(Exception ex, WebRequest request) {
//        return new ErrorMessage("Đối tượng không tồn tại");
//    }
}
