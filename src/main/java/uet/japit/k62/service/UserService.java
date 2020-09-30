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
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.constant.PermissionConstant;
import uet.japit.k62.dao.IAccountTypeDAO;
import uet.japit.k62.dao.IPermissionDAO;
import uet.japit.k62.dao.IUserDAO;
import uet.japit.k62.exception.exception_define.AccountWasLockedException;
import uet.japit.k62.exception.exception_define.UserNotFoundException;
import uet.japit.k62.exception.exception_define.WrongEmailOrPasswordException;
import uet.japit.k62.filters.JwtTokenProvider;
import uet.japit.k62.models.auth.CustomUserDetail;
import uet.japit.k62.models.entity.AccountType;
import uet.japit.k62.models.entity.Permission;
import uet.japit.k62.models.entity.User;
import uet.japit.k62.models.request.ReqChangeAccountType;
import uet.japit.k62.models.request.ReqChangePermission;
import uet.japit.k62.models.request.ReqLogin;
import uet.japit.k62.models.request.ReqRegister;
import uet.japit.k62.models.response.data_response.ResLogin;
import uet.japit.k62.models.response.service_response.ServiceResponse;
import uet.japit.k62.service.authorize.AttributeTokenService;

import javax.servlet.http.HttpServletRequest;
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
            throw new WrongEmailOrPasswordException();
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

                serviceResponse.setMessage(MessageConstant.SUCCESS);
                serviceResponse.setStatus(true);
            }
            else
            {
                throw new AccountWasLockedException();

            }
        }
        serviceResponse.setData(response);
        return serviceResponse;
    }

    public Boolean userExisted(String email)
    {
        User user = userDAO.findByEmail(email);
        if(user == null)
        {
            throw new UserNotFoundException();
        }
        return true;
    }

    public ServiceResponse loginDisable(HttpServletRequest httpRequest, String userId)
    {
        ServiceResponse serviceResponse = new ServiceResponse();
        String token = httpRequest.getHeader("Authorization");
        User loginEnableUser = userDAO.getOne(userId);
        if(loginEnableUser == null)
        {
            throw new UserNotFoundException();
        }
        User userSendRequest = userDAO.findByEmail(AttributeTokenService.getEmailFromToken(token));
        loginEnableUser.setUpdatedBy(userSendRequest.getId());
        loginEnableUser.setIsActive(!loginEnableUser.getIsActive());
        loginEnableUser.setUpdatedAt(new Date());
        userDAO.save(loginEnableUser);
        serviceResponse.setStatus(true);
        serviceResponse.setMessage(MessageConstant.SUCCESS);
        return serviceResponse;
    }

    public ServiceResponse register(ReqRegister requestData)
    {
        ServiceResponse serviceResponse = new ServiceResponse();
        if(!this.userExisted(requestData.getEmail()))
        {
            User newUser = new User();
            newUser.setAccountType(accountTypeDAO.findByCode(AccountTypeConstant.USER));
            newUser.setPassword(passwordEncoder.encode(requestData.getPassword()));
            newUser.setEmail(requestData.getEmail());
            newUser.setDisplayName(requestData.getDisplayName());
            userDAO.save(newUser);
            serviceResponse.setStatus(true);
            serviceResponse.setMessage(MessageConstant.SUCCESS);
        }
        else
        {
            serviceResponse.setMessage(MessageConstant.USER_EXISTED);

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

    public ServiceResponse changeAccountType(HttpServletRequest httpRequest, ReqChangeAccountType requestData)
    {
        ServiceResponse response = new ServiceResponse();
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        AccountType accountTypeEntity = accountTypeDAO.findByCode(requestData.getAccountType());
        User user = userDAO.findById(requestData.getUserId()).get();
        if(!requestData.getAccountType().equals(AccountTypeConstant.ROOT))
        {
            user.setPermissionList(new ArrayList<Permission>());
        }
        if(requestData.getAccountType().equals(AccountTypeConstant.ADMIN) &&
            !user.getAccountType().equals(AccountTypeConstant.ADMIN))
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

        }else if(requestData.getAccountType().equals(AccountTypeConstant.ORGANIZER) &&
                !user.getAccountType().equals(AccountTypeConstant.ORGANIZER))
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
        response.setStatus(true);
        response.setMessage(MessageConstant.SUCCESS);
        return response;
    }


    public ServiceResponse changePermission(HttpServletRequest httpRequest, ReqChangePermission requestData)
    {
        ServiceResponse response = new ServiceResponse();
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User user = userDAO.findById(requestData.getUserId()).get();
        User userSendRequest = userDAO.findByEmail(emailSendRequest);
        if(!emailSendRequest.equals(user.getEmail()))
        {
            user.setPermissionList(new ArrayList<Permission>());
            for (String permissionCode : requestData.getPermissionCodeList())
            {
                Permission permissionEntity = permissionDAO.findByCode(permissionCode);
                user.getPermissionList().add(permissionEntity);
            }
            user.setUpdatedAt(new Date());
            user.setUpdatedBy(userSendRequest.getId());
            userDAO.save(user);
            response.setStatus(true);
            response.setMessage(MessageConstant.SUCCESS);
        } else
        {
            response.setStatus(false);
            response.setMessage(MessageConstant.CANT_SELF_UPDATE_PERMISSION);
        }
        return response;
    }
}
