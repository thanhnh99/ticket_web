package uet.japit.k62.exception.exception_define.detail;

import uet.japit.k62.exception.exception_define.common.EntityNotFoundException;

public class VoucherNotFoundException extends EntityNotFoundException {
    public VoucherNotFoundException() {
        super("Voucher không tồn tại");
    }
}
