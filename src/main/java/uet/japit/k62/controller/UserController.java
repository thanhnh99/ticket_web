package uet.japit.k62.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uet.japit.k62.dao.IPermissionDAO;
import uet.japit.k62.exception.exception_define.detail.NotUpdateSelfPermissionException;
import uet.japit.k62.exception.exception_define.detail.UserNotFoundException;
import uet.japit.k62.models.request.ReqChangeAccountType;
import uet.japit.k62.models.request.ReqChangePermission;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.service.UserService;
import uet.japit.k62.service.authorize.AttributeTokenService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    IPermissionDAO permissionDAO;

    @Autowired
    UserService userService;

    @PostMapping("/account-type")
    @PreAuthorize("@appAuthorizer.authorize(authentication, {T(uet.japit.k62.constant.PermissionConstant).CHANGE_ACCOUNT_TYPE})")
    public ResponseEntity<HttpResponse> changeAccountType(HttpServletRequest httpRequest,
                                                          @RequestBody ReqChangeAccountType requestData)
    {
        HttpResponse responseData = userService.changeAccountType(httpRequest,requestData);
        return ResponseEntity.ok(responseData);
    }


    @PutMapping("/permission")
    @PreAuthorize("@appAuthorizer.authorize(authentication, {T(uet.japit.k62.constant.PermissionConstant).CHANGE_PERMISSION})")
    public ResponseEntity<HttpResponse> changePermission(HttpServletRequest httpRequest, @RequestBody ReqChangePermission requestData) throws NotUpdateSelfPermissionException {
        HttpResponse responseData = userService.changePermission(httpRequest,requestData);
        return ResponseEntity.ok(responseData);
    }


    @PutMapping("/{userId}/disable")
    @PreAuthorize("@appAuthorizer.authorize(authentication, {T(uet.japit.k62.constant.PermissionConstant).DISABLE_USER})")
    public ResponseEntity<HttpResponse> disableUser(HttpServletRequest httpRequest, @PathVariable(name = "userId") String userId) throws UserNotFoundException {
        HttpResponse responseData = userService.loginDisable(httpRequest,userId);
        return ResponseEntity.ok(responseData);
    }

    @GetMapping("/me")
    public ResponseEntity<HttpResponse> getUserInfo(HttpServletRequest httpServletRequest) throws UserNotFoundException {
        HttpResponse response = new HttpResponse();
        String token = httpServletRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        HttpResponse responseData = userService.getUserInfo(emailSendRequest);
        return ResponseEntity.ok(responseData);
    }

//    @PutMapping("/me")
//    public ResponseEntity<HttpResponse> updateUserInfo(HttpServletRequest httpServletRequest,
//                                                       @RequestBody Req) throws UserNotFoundException {
//        HttpResponse response = new HttpResponse();
//        String token = httpServletRequest.getHeader("Authorization");
//        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
//        HttpResponse responseData = userService.getUserInfo(emailSendRequest);
//        return ResponseEntity.ok(responseData);
//    }

    @GetMapping("/{email}/info")
    @PreAuthorize("@appAuthorizer.authorize(authentication, {T(uet.japit.k62.constant.PermissionConstant).GET_USER_INFO})")
    public ResponseEntity<HttpResponse> getUserInfo(@PathVariable(name = "email") String email) throws UserNotFoundException {
        HttpResponse responseData = userService.getUserInfo(email);
        return ResponseEntity.ok(responseData);
    }
}
