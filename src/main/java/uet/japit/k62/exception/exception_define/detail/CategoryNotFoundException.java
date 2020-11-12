package uet.japit.k62.exception.exception_define.detail;

import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.exception.exception_define.common.EntityNotFoundException;

public class CategoryNotFoundException extends EntityNotFoundException {
    public CategoryNotFoundException()
    {
        super(MessageConstant.CATEGORY_NOT_FOUND);
    }
}
