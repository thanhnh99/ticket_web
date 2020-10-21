package uet.japit.k62.exception.exception_define.detail;

import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.exception.exception_define.common.EntityNotFoundException;

public class EventNotFoundException extends EntityNotFoundException {
    public EventNotFoundException() {
        super(MessageConstant.EVENT_NOT_FOUND);
    }
}
