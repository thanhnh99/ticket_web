package uet.japit.k62.exception.exception_define.detail;

import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.exception.exception_define.common.EntityNotFoundException;

public class UserNotFoundException extends EntityNotFoundException {
    public UserNotFoundException()
    {
        super(MessageConstant.USER_EXISTED);
    }
}
