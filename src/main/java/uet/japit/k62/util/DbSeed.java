package uet.japit.k62.util;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import uet.japit.k62.constant.AccountTypeConstant;
import uet.japit.k62.constant.PermissionConstant;
import uet.japit.k62.dao.IPermissionDAO;
import uet.japit.k62.dao.IAccountTypeDAO;
import uet.japit.k62.dao.IUserDAO;
import uet.japit.k62.models.entity.Permission;
import uet.japit.k62.models.entity.AccountType;
import uet.japit.k62.models.entity.User;

import java.lang.reflect.Field;
import java.util.List;

@Configuration
public class DbSeed {
    private final PasswordEncoder passwordEncoder;
    private final IUserDAO userDAO;
    private final IPermissionDAO permissionDAO;
    private final IAccountTypeDAO accountTypeDAO;

    public DbSeed(PasswordEncoder passwordEncoder, IUserDAO userDao, IPermissionDAO permissionDAO, IAccountTypeDAO accountTypeDAO)
    {
        this.passwordEncoder = passwordEncoder;
        this.userDAO = userDao;
        this.permissionDAO = permissionDAO;
        this.accountTypeDAO = accountTypeDAO;
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
    public void addAccountType()
    {
        AccountTypeConstant accountTypeDefaultList = new AccountTypeConstant();
        for (Field accountType :
                accountTypeDefaultList.getClass().getDeclaredFields()) {
            if(accountTypeDAO.findByCode(accountType.getName()) == null)
            {
                AccountType newAccountType = new AccountType();
                newAccountType.setCode(accountType.getName());
                newAccountType.setName(accountType.getName());
                accountTypeDAO.save(newAccountType);
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
            user.setAccountType(accountTypeDAO.findByCode(AccountTypeConstant.USER));
            userDAO.save(user);
        }
    }

    @Bean
    public void addRoot()
    {
        if(userDAO.findByEmail("thanhnh99.amc@gmail.com") == null)
        {
            User user = new User();
            user.setDisplayName("Huu Thanh");
            user.setEmail("thanhnh99.amc@gmail.com");
            user.setPassword(passwordEncoder.encode("12345"));
            user.setAccountType(accountTypeDAO.findByCode(AccountTypeConstant.ROOT));
            List<Permission> permissionList = permissionDAO.findAll();
            user.setPermissionList(permissionList);
            userDAO.save(user);
        }
    }
}
