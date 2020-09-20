package uet.japit.k62.service.authorize;

import org.springframework.security.core.Authentication;

import java.util.List;

public interface IAppAuthorizer {
    boolean authorize(Authentication authentication, List<String> permissions);

}
