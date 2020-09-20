package uet.japit.k62.util;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import uet.japit.k62.constant.AccountTypeConstant;
import uet.japit.k62.constant.PermissionConstant;
import uet.japit.k62.dao.IPermissionDAO;
import uet.japit.k62.dao.IRoleDAO;
import uet.japit.k62.dao.IUserDAO;
import uet.japit.k62.models.entity.Permission;
import uet.japit.k62.models.entity.Role;
import uet.japit.k62.models.entity.User;

import java.lang.reflect.Field;
import java.util.List;

@Configuration
public class DbSeed {
    private final PasswordEncoder passwordEncoder;
    private final IUserDAO userDAO;
    private final IPermissionDAO permissionDAO;
    private final IRoleDAO roleDAO;

    public DbSeed(PasswordEncoder passwordEncoder, IUserDAO userDao, IPermissionDAO permissionDAO, IRoleDAO roleDAO)
    {
        this.passwordEncoder = passwordEncoder;
        this.userDAO = userDao;
        this.permissionDAO = permissionDAO;
        this.roleDAO = roleDAO;
    }

    @Bean
    public void addPermission()
    {
        PermissionConstant permissionList = new PermissionConstant();
        for (Field permission :
                permissionList.getClass().getDeclaredFields()) {
            if(permissionDAO.findByCode(permission.getName()) == null)
            {
                Permission newPermission = new Permission();
                newPermission.setCode(permission.getName());
                newPermission.setDisplayName(permission.getName());
                permissionDAO.save(newPermission);
            }
        }
    }
    
    @Bean
    public void addRole()
    {
        AccountTypeConstant roleList = new AccountTypeConstant();
        for (Field role :
                roleList.getClass().getDeclaredFields()) {
            if(roleDAO.findByCode(role.getName()) == null)
            {
                Role newRole = new Role();
                newRole.setCode(role.getName());
                newRole.setName(role.getName());
                roleDAO.save(newRole);
            }
        }
    }
    @Bean
    public void addUser()
    {
        if(userDAO.findByEmail("huuthanh99hn@gmail.com") == null)
        {
            User user = new User();
            user.setDisplayName("Huu Thanh");
            user.setEmail("huuthanh99hn@gmail.com");
            user.setPassword(passwordEncoder.encode("12345"));
            user.setRole(roleDAO.findByCode(AccountTypeConstant.USER));
            userDAO.save(user);
        }
    }
}
