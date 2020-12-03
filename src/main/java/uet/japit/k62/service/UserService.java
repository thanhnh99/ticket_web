package uet.japit.k62.service;


import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
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
import uet.japit.k62.constant.StatusCode;
import uet.japit.k62.dao.IAccountTypeDAO;
import uet.japit.k62.dao.IPermissionDAO;
import uet.japit.k62.dao.IUserDAO;
import uet.japit.k62.exception.exception_define.detail.*;
import uet.japit.k62.filters.JwtTokenProvider;
import uet.japit.k62.job.MailProcess;
import uet.japit.k62.models.auth.CustomUserDetail;
import uet.japit.k62.models.entity.AccountType;
import uet.japit.k62.models.entity.Permission;
import uet.japit.k62.models.entity.User;
import uet.japit.k62.models.request.*;
import uet.japit.k62.models.response.data_response.ResLogin;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.models.response.http_response.MessageResponse;
import uet.japit.k62.service.authorize.AttributeTokenService;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
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

    @Autowired
    MailProcess mailProcess;

    @Autowired
    JavaMailSender emailSender;

    public HttpResponse<ResLogin> authenticateUser(ReqLogin request) throws AccountWasLockedException, WrongEmailOrPasswordException, AccountNotVerifyException {
        HttpResponse httpResponse = new HttpResponse();
        ResLogin response = new ResLogin();
        CustomUserDetail customUserDetail = loadUserByEmail(request.getEmail());
        if(customUserDetail == null ||
                !passwordEncoder.matches(request.getPassword(), customUserDetail.getPassword()))
        {
            throw new WrongEmailOrPasswordException();
        }
        else
        {
            if(!customUserDetail.getUser().getIsVerify())
            {
                throw new AccountNotVerifyException();
            }
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
                response.setDisplayName(customUserDetail.getDisplayName());

                httpResponse.setMessage(MessageConstant.SUCCESS);
                httpResponse.setStatusCode(StatusCode.OK);
                httpResponse.setData(response);
            }
            else
            {
                throw new AccountWasLockedException();
            }
        }
        return httpResponse;
    }

    public Boolean userExisted(String email)
    {
        User user = userDAO.findByEmail(email);
        if(user == null)
        {
            return false;
        }
        return true;
    }

    public HttpResponse loginDisable(HttpServletRequest httpRequest, String userId) throws UserNotFoundException {
        HttpResponse httpResponse = new HttpResponse();
        String token = httpRequest.getHeader("Authorization");
        User loginEnableUser = userDAO.findById(userId).get();
        if(loginEnableUser == null)
        {
            throw new UserNotFoundException();
        }
        User userSendRequest = userDAO.findByEmail(AttributeTokenService.getEmailFromToken(token));
        loginEnableUser.setUpdatedBy(userSendRequest.getId());
        loginEnableUser.setIsActive(!loginEnableUser.getIsActive());
        loginEnableUser.setUpdatedAt(new Date());
        userDAO.save(loginEnableUser);
        httpResponse.setStatusCode(StatusCode.OK);
        httpResponse.setMessage(MessageConstant.SUCCESS);
        return httpResponse;
    }

    public MessageResponse register(ReqRegister requestData) throws UserExistedException, SchedulerException {
        MessageResponse messageResponse = new MessageResponse();

        if(this.userExisted(requestData.getEmail()))
        {
            throw new UserExistedException();
        }

        User newUser = new User();
        newUser.setAccountType(accountTypeDAO.findByCode(AccountTypeConstant.USER));
        newUser.setPassword(passwordEncoder.encode(requestData.getPassword()));
        newUser.setEmail(requestData.getEmail());
        newUser.setDisplayName(requestData.getDisplayName());
        newUser.setIsVerify(false);
        newUser.setIsActive(true);
        userDAO.save(newUser);

        //active sendmail
        mailProcess.sendMail(new ReqSendMail(newUser.getEmail(),
                                             "Vui lòng click vào đường linh dưới đây để kích hoạt tài khoản của bạn: "
                                                     +"<a href=\""
                                                     + InetAddress.getLoopbackAddress().getHostName()
                                                     + "/user/verify/" + newUser.getId() + "\""
                                                     +" target=\"_blank\" title=\"học lập trình online\">Kích hoạt tài khoản</a>",
                                                "Mail kích hoạt tài khoản TicketBox"),
                emailSender);
        messageResponse.setStatusCode(StatusCode.OK);
        messageResponse.setMessage(MessageConstant.SUCCESS);
        return messageResponse;
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

    public HttpResponse changeAccountType(HttpServletRequest httpRequest, ReqChangeAccountType requestData)
    {
        HttpResponse response = new HttpResponse();
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
        user.setUpdatedBy(emailSendRequest);
        userDAO.save(user);
        response.setStatusCode(StatusCode.OK);
        response.setMessage(MessageConstant.SUCCESS);
        return response;
    }


    public HttpResponse changePermission(HttpServletRequest httpRequest, ReqChangePermission requestData) throws NotUpdateSelfPermissionException {
        HttpResponse response = new HttpResponse();
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
            response.setStatusCode(StatusCode.OK);
            response.setMessage(MessageConstant.SUCCESS);
        } else
        {
            throw new NotUpdateSelfPermissionException();
        }
        return response;
    }

    public MessageResponse verifyAccount(String userId) throws UserNotFoundException {
        User user = userDAO.findById(userId).get();
        if (user == null)
            throw new UserNotFoundException();
        user.setIsVerify(true);
        userDAO.save(user);
        return new MessageResponse();
    }
}
