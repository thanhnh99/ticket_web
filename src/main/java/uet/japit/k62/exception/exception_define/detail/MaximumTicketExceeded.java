package uet.japit.k62.exception.exception_define.detail;

public class MaximumTicketExceeded extends Exception {
    public MaximumTicketExceeded() {
        super("Số vé đã chọn vượt quá số vé có thể mua");
    }
}
