package uet.japit.k62.exception.exception_define.detail;

import uet.japit.k62.constant.MessageConstant;

public class AccountNotVerifyException extends Exception {
    public AccountNotVerifyException()
    {
        super(MessageConstant.ACCOUNT_NOT_VERIFY);
    }
}
