package uet.japit.k62.controller;

import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import uet.japit.k62.exception.exception_define.detail.*;
import uet.japit.k62.models.request.ReqLogin;
import uet.japit.k62.models.request.ReqRegister;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.models.response.http_response.MessageResponse;
import uet.japit.k62.service.UserService;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("")
public class AuthController {
    @Autowired
    UserService userService;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody ReqLogin requestData) throws AccountWasLockedException, WrongEmailOrPasswordException, AccountNotVerifyException {
        HttpResponse responseData = userService.authenticateUser(requestData);
        return ResponseEntity.ok(responseData);
    }

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody ReqRegister requestData) throws UserExistedException, SchedulerException {
        MessageResponse responseData = userService.register(requestData);
        return ResponseEntity.ok(responseData);
    }

    @GetMapping("user/verify/{userId}")
    public ResponseEntity verifyAccount(@PathVariable @NotNull String userId) throws UserNotFoundException {
        MessageResponse responseData = userService.verifyAccount(userId);
        return ResponseEntity.ok(responseData);
    }

}
