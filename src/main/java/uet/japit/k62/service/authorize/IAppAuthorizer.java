package uet.japit.k62.service.authorize;

import org.springframework.security.core.Authentication;
import uet.japit.k62.exception.exception_define.detail.AccountNotVerifyException;
import uet.japit.k62.exception.exception_define.detail.AccountWasLockedException;

import java.util.List;

public interface IAppAuthorizer {
    boolean authorize(Authentication authentication, List<String> permissions) throws AccountWasLockedException, AccountNotVerifyException;

}
