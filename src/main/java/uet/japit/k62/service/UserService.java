package uet.japit.k62.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uet.japit.k62.constant.AccountTypeConstant;
import uet.japit.k62.constant.ErrorConstant;
import uet.japit.k62.constant.PermissionConstant;
import uet.japit.k62.dao.IAccountTypeDAO;
import uet.japit.k62.dao.IPermissionDAO;
import uet.japit.k62.dao.IUserDAO;
import uet.japit.k62.filters.JwtTokenProvider;
import uet.japit.k62.models.auth.CustomUserDetail;
import uet.japit.k62.models.entity.AccountType;
import uet.japit.k62.models.entity.Permission;
import uet.japit.k62.models.entity.User;
import uet.japit.k62.models.request.ReqAddPermission;
import uet.japit.k62.models.request.ReqLogin;
import uet.japit.k62.models.request.ReqRegister;
import uet.japit.k62.models.response.data_response.ResLogin;
import uet.japit.k62.models.response.service_response.ServiceResponse;
import uet.japit.k62.service.authorize.AttributeTokenService;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    IUserDAO userDAO;
    @Autowired
    IAccountTypeDAO accountTypeDAO;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    IPermissionDAO permissionDAO;

    public ServiceResponse<ResLogin> authenticateUser(ReqLogin request)
    {
        ServiceResponse serviceResponse = new ServiceResponse();
        ResLogin response = new ResLogin();
        CustomUserDetail customUserDetail = loadUserByEmail(request.getEmail());
        if(customUserDetail == null ||
                !passwordEncoder.matches(request.getPassword(), customUserDetail.getPassword()))
        {
            serviceResponse.setStatus(false);
            serviceResponse.setMessage(ErrorConstant.AUTHENTICATE_FAIL);
            response = null;
        }
        else
        {
            if(customUserDetail.getUser().getIsActive())
            {
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                ));

                String token = jwtTokenProvider.generateJwt(customUserDetail);
                response.setToken(token);
                response.setPermissionList((List<GrantedAuthority>) customUserDetail.getAuthorities());
                response.setAccountType(customUserDetail.getAccountType());

                serviceResponse.setMessage(ErrorConstant.SUCCESS);
                serviceResponse.setStatus(true);
            }
            else
            {
                response = null;
                serviceResponse.setMessage(ErrorConstant.ACCOUNT_IS_LOCKED);
                serviceResponse.setStatus(false);

            }
        }
        serviceResponse.setData(response);
        return serviceResponse;
    }

    public Boolean userExisted(String email)
    {
        try {
            User user = userDAO.findByEmail(email);
            if(user == null)
            {
                return false;
            }
            return true;
        }catch (NullPointerException e)
        {
            return true;
        }
    }

    public Boolean loginEnable(HttpServletRequest httpRequest, String userId)
    {
        String token = httpRequest.getHeader("Authorization");
        try{

            User loginEnableUser = userDAO.getOne(userId);
            User userRequest = userDAO.findByEmail(AttributeTokenService.getEmailFromToken(token));

            if(AttributeTokenService.checkAccess(token, PermissionConstant.DISABLE_USER))
            {
                loginEnableUser.setUpdatedBy(userRequest.getId());
                loginEnableUser.setIsActive(!loginEnableUser.getIsActive());
                loginEnableUser.setUpdatedAt(new Date());
                userDAO.save(loginEnableUser);
                return true;
            }
            return false;
        } catch (Exception e)
        {
            System.out.println("Err in UserService.loginEnable");
            return false;
        }

    }

    public ServiceResponse register(ReqRegister requestData)
    {
        ServiceResponse serviceResponse = new ServiceResponse();
        try {
            if(!this.userExisted(requestData.getEmail()))
            {
                User newUser = new User();
                newUser.setAccountType(accountTypeDAO.findByCode(AccountTypeConstant.USER));
                newUser.setPassword(passwordEncoder.encode(requestData.getPassword()));
                newUser.setEmail(requestData.getEmail());
                newUser.setDisplayName(requestData.getDisplayName());
                userDAO.save(newUser);
                serviceResponse.setStatus(true);
                serviceResponse.setMessage(ErrorConstant.SUCCESS);
            }
            serviceResponse.setMessage(ErrorConstant.USER_EXISTED);
        }catch (Exception e)
        {
            System.out.println("Err in UserService.register: " + e.getMessage());
            serviceResponse.setMessage(ErrorConstant.HAS_EXCEPTION);
        }
        return serviceResponse;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        //Kiểm tra user có tồn tại không
        User user = userDAO.findByEmail(email);
        if(user == null)
        {
            throw new UsernameNotFoundException(email);
        }
        return  new CustomUserDetail(user);
    }

    public CustomUserDetail loadUserByEmail(String email){
        User user = userDAO.findByEmail(email);
        if(user == null) {
            return null;
        }
        return new CustomUserDetail(user);
    }

    //TODO: CHECK THIS FUNCTION
    public void changeAccountType(User user, String accountType)
    {
        try {
            AccountType accountTypeEntity = accountTypeDAO.findByCode(accountType);
            user.setPermissionList(new ArrayList<Permission>());
            //update accountType
            //update permission
            if(accountType.equals(AccountTypeConstant.ADMIN))
            {
                user.getPermissionList().add(permissionDAO.findByCode(PermissionConstant.CHANGE_ACCOUNT_TYPE));
                user.getPermissionList().add(permissionDAO.findByCode(PermissionConstant.ADD_CATEGORY));
                user.getPermissionList().add(permissionDAO.findByCode(PermissionConstant.ADD_VOUCHER));
                user.getPermissionList().add(permissionDAO.findByCode(PermissionConstant.DELETE_EVENT));
                user.getPermissionList().add(permissionDAO.findByCode(PermissionConstant.DELETE_CATEGORY));
                user.getPermissionList().add(permissionDAO.findByCode(PermissionConstant.ADD_CATEGORY));
                user.getPermissionList().add(permissionDAO.findByCode(PermissionConstant.EDIT_VOUCHER));
                user.getPermissionList().add(permissionDAO.findByCode(PermissionConstant.DELETE_VOUCHER));
                user.getPermissionList().add(permissionDAO.findByCode(PermissionConstant.GET_VOUCHER));

            }else if(accountType.equals(AccountTypeConstant.ORGANIZER))
            {
                user.getPermissionList().add(permissionDAO.findByCode(PermissionConstant.ADD_EVENT));
                user.getPermissionList().add(permissionDAO.findByCode(PermissionConstant.EDIT_EVENT));
                user.getPermissionList().add(permissionDAO.findByCode(PermissionConstant.DELETE_EVENT));
                user.getPermissionList().add(permissionDAO.findByCode(PermissionConstant.ADD_VOUCHER));
                user.getPermissionList().add(permissionDAO.findByCode(PermissionConstant.EDIT_VOUCHER));
                user.getPermissionList().add(permissionDAO.findByCode(PermissionConstant.DELETE_VOUCHER));
                user.getPermissionList().add(permissionDAO.findByCode(PermissionConstant.GET_VOUCHER));
            }
            user.setAccountType(accountTypeEntity);
            userDAO.save(user);
        }catch (Exception e)
        {
            System.out.println("Err in " + this.getClass().getName() + ".changeAccountType: " + e.getMessage());
        }
    }


    public ServiceResponse addPermission(HttpServletRequest httpRequest, ReqAddPermission permissionCode)
    {
        return null;
    }
}
