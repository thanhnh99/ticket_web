package uet.japit.k62.exception.exception_define.detail;


import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.exception.exception_define.common.EntityHasExistedException;

public class VoucherHasExistedException extends EntityHasExistedException {
    public VoucherHasExistedException() {
        super(MessageConstant.VOUCHER_HAS_EXISTED);
    }
}
