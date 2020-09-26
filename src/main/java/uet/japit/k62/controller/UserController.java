package uet.japit.k62.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uet.japit.k62.dao.IPermissionDAO;
import uet.japit.k62.models.request.ReqChangeAccountType;
import uet.japit.k62.models.request.ReqChangePermission;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.models.response.service_response.ServiceResponse;
import uet.japit.k62.service.UserService;

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
        HttpResponse responseData = new HttpResponse();
        ServiceResponse serviceResponse = userService.changeAccountType(httpRequest,requestData);
        return ServiceResponse.getHttpResponseResponseEntity(responseData, serviceResponse);
    }


    @PutMapping("/permission")
    @PreAuthorize("@appAuthorizer.authorize(authentication, {T(uet.japit.k62.constant.PermissionConstant).CHANGE_PERMISSION})")
    public ResponseEntity<HttpResponse> changePermission(HttpServletRequest httpRequest, @RequestBody ReqChangePermission requestData)
    {
        HttpResponse responseData = new HttpResponse();
        ServiceResponse serviceResponse = userService.changePermission(httpRequest,requestData);
        return ServiceResponse.getHttpResponseResponseEntity(responseData, serviceResponse);
    }


    @PutMapping("/{userId}/disable")
    @PreAuthorize("@appAuthorizer.authorize(authentication, {T(uet.japit.k62.constant.PermissionConstant).DISABLE_USER})")
    public ResponseEntity<HttpResponse> disableUser(HttpServletRequest httpRequest, @PathVariable(name = "userId") String userId)
    {
        HttpResponse responseData = new HttpResponse();
        ServiceResponse serviceResponse = userService.loginDisable(httpRequest,userId);
        return ServiceResponse.getHttpResponseResponseEntity(responseData, serviceResponse);
    }

}
