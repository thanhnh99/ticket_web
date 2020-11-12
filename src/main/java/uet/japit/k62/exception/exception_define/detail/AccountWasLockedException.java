package uet.japit.k62.exception.exception_define.detail;

import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.exception.exception_define.common.EntityHasDisableException;

public class AccountWasLockedException extends EntityHasDisableException {
    public AccountWasLockedException() {
        super(MessageConstant.ACCOUNT_WAS_LOCKED);
    }
}
