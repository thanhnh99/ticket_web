package uet.japit.k62.exception.exception_define.detail;

public class InvalidVoucherException extends Exception {
    public InvalidVoucherException() {
        super("booking không thỏa mãn khuyến mãi");
    }
}
