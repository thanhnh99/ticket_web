package uet.japit.k62.exception.exception_define.detail;

public class InvalidPaymentException extends Exception {
    public InvalidPaymentException() {
        super("Đơn hàng đã quá hạn thanh toán");
    }
}
