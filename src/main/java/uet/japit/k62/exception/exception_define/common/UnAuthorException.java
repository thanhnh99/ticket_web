package uet.japit.k62.exception.exception_define.common;

import uet.japit.k62.constant.MessageConstant;

public class UnAuthorException extends Exception{
    public UnAuthorException()
    {
        super(MessageConstant.UN_AUTHORIZATION);
    }
}
