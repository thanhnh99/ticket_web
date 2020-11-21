package uet.japit.k62.exception.exception_define.detail;

public class PaymentTypeNotSupported extends Exception {
    public PaymentTypeNotSupported() {
        super("Không hỗ trợ loại phương thức đã chọn");
    }
}
