package uet.japit.k62.exception.exception_define.detail;

public class NotInBookingTimeException extends Exception {
    public NotInBookingTimeException() {
        super("Ngoài thời gian đặt vé");
    }
}
