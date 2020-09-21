package uet.japit.k62.service.authorize;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import uet.japit.k62.dao.IUserDAO;
import uet.japit.k62.models.auth.CustomUserDetail;
import uet.japit.k62.models.entity.User;

import java.util.List;

@Service("appAuthorizer")
public class AppAuthorizerImpl implements IAppAuthorizer {
    @Autowired
    IUserDAO userDAO;

    private final Logger logger = LoggerFactory.getLogger(AppAuthorizerImpl.class);

    @Override
    public boolean authorize(Authentication authentication, List<String> permissions) {
        for (String permission : permissions)
        {
            System.out.print(permission + " - ");
        }
        System.out.println(" only proceed this task!!!!!");
        boolean isAllow = false;
        try {
            UsernamePasswordAuthenticationToken user = (UsernamePasswordAuthenticationToken) authentication;
            if (user==null){
                return false;
            }
            CustomUserDetail customUserDetail = (CustomUserDetail) user.getPrincipal();
            String email = customUserDetail.getEmail();
            if (email==null || "".equals(email.trim())) {
                return false;
            }
            //Truy vấn vào CSDL theo userId + menuCode + action
            //Nếu có quyền thì
            User userEntity = userDAO.findByEmail(email);
            if(userEntity != null && userEntity.getIsActive())
            {
                for(String permission : userEntity.getPermissionStringList())
                {
                    for (String permissionInput : permissions)
                    {
                        if(permission.equals(permissionInput))
                        {
                            isAllow = true;
                            break;
                        }
                    }
                    if (isAllow == true)
                    {
                        break;
                    }
                }
            }
        } catch (Exception e) {
            logger.error(e.toString(), e);
            throw e;
        }
        return isAllow;
    }
}