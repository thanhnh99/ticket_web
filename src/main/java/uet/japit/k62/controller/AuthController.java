package uet.japit.k62.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uet.japit.k62.constant.ErrorConstant;
import uet.japit.k62.constant.StatusCode;
import uet.japit.k62.models.request.ReqLogin;
import uet.japit.k62.models.request.ReqRegister;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.models.response.service_response.ServiceResponse;
import uet.japit.k62.service.UserService;

@RestController
@RequestMapping("")
public class AuthController {
    @Autowired
    UserService userService;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody ReqLogin requestData)
    {
        HttpResponse responseData = new HttpResponse();
        ServiceResponse serviceResponse = userService.authenticateUser(requestData);
        return ServiceResponse.getHttpResponseResponseEntity(responseData, serviceResponse);
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody ReqRegister requestData)
    {
        HttpResponse responseData = new HttpResponse();
        ServiceResponse serviceResponse = userService.register(requestData);
        return ServiceResponse.getHttpResponseResponseEntity(responseData, serviceResponse);
    }

}
