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
import uet.japit.k62.dao.IRoleDAO;
import uet.japit.k62.dao.IUserDAO;
import uet.japit.k62.filters.JwtTokenProvider;
import uet.japit.k62.models.auth.CustomUserDetail;
import uet.japit.k62.models.entity.User;
import uet.japit.k62.models.request.ReqLogin;
import uet.japit.k62.models.response.data_response.ResLogin;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    IUserDAO userDAO;
    @Autowired
    IRoleDAO roleDAO;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    PasswordEncoder passwordEncoder;

    public ResLogin authenticate(ReqLogin request)
    {
        ResLogin response = new ResLogin();
        CustomUserDetail customUserDetail = loadUserByEmail(request.getEmail());
        if(customUserDetail == null ||
                !passwordEncoder.matches(request.getPassword(), customUserDetail.getPassword()))
        {
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
                response.setRoleList(customUserDetail.getRoles());
                response.setPermissionList((List<GrantedAuthority>) customUserDetail.getAuthorities());
            }
            else
            {
                response = null;
            }
        }
        return response;
    }

    public Boolean checkUserExisted(String email)
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


}

