package uet.japit.k62.exception.exception_define.detail;

import uet.japit.k62.constant.MessageConstant;

public class InvalidConditionException extends Exception {
    public InvalidConditionException() {
        super(MessageConstant.INVALID_CONDITION);
    }
}
