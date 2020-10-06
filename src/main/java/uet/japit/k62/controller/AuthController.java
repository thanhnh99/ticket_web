package uet.japit.k62.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uet.japit.k62.exception.exception_define.detail.AccountWasLockedException;
import uet.japit.k62.exception.exception_define.detail.UserExistedException;
import uet.japit.k62.exception.exception_define.detail.WrongEmailOrPasswordException;
import uet.japit.k62.models.request.ReqLogin;
import uet.japit.k62.models.request.ReqRegister;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.models.response.http_response.MessageResponse;
import uet.japit.k62.service.UserService;

@RestController
@RequestMapping("")
public class AuthController {
    @Autowired
    UserService userService;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody ReqLogin requestData) throws AccountWasLockedException, WrongEmailOrPasswordException {
        HttpResponse responseData = userService.authenticateUser(requestData);
        return ResponseEntity.ok(responseData);
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody ReqRegister requestData) throws UserExistedException {
        MessageResponse responseData = userService.register(requestData);
        return ResponseEntity.ok(responseData);
    }

}
