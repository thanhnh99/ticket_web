package uet.japit.k62.exception.exception_define.detail;

import uet.japit.k62.exception.exception_define.common.EntityNotFoundException;

public class TicketNotFoundException extends EntityNotFoundException {
    public TicketNotFoundException() {
        super("Loại vé đã chọn không tồn tại");
    }
}
