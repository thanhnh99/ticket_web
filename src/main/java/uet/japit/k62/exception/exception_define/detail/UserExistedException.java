package uet.japit.k62.exception.exception_define.detail;

import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.exception.exception_define.common.EntityHasExistedException;

public class UserExistedException extends EntityHasExistedException {
    public UserExistedException()
    {
        super(MessageConstant.USER_EXISTED);
    }
}
