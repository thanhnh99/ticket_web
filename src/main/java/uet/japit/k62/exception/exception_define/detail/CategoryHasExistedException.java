package uet.japit.k62.exception.exception_define.detail;

import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.exception.exception_define.common.EntityHasExistedException;

public class CategoryHasExistedException extends EntityHasExistedException {
    public CategoryHasExistedException() {
        super(MessageConstant.CATEGORY_HAS_EXISTED);
    }
}
