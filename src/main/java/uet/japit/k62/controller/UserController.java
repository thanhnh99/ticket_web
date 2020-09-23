package uet.japit.k62.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uet.japit.k62.constant.ErrorConstant;
import uet.japit.k62.constant.StatusCode;
import uet.japit.k62.dao.IPermissionDAO;
import uet.japit.k62.models.entity.Permission;
import uet.japit.k62.models.request.ReqAddPermission;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.models.response.service_response.ServiceResponse;
import uet.japit.k62.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    IPermissionDAO permissionDAO;

    @Autowired
    UserService userService;

    @PostMapping
    @PreAuthorize("@appAuthorizer.authorize(authentication, {'CHANGE_ACCOUNT_TYPE'})")
    public ResponseEntity<HttpResponse> changeAccountType()
    {
        List<Permission> permissionList = permissionDAO.findAll();
        return null;
    }

    @PostMapping("/permission")
    @PreAuthorize("@appAuthorizer.authorize(authentication, {'ADD_PERMISSION'})")
    public ResponseEntity<HttpResponse> addPermission(HttpServletRequest httpRequest, @RequestBody ReqAddPermission requestData)
    {
        HttpResponse responseData = new HttpResponse();
        ServiceResponse serviceResponse = userService.addPermission(httpRequest,requestData);
        responseData.setMessage(serviceResponse.getMessage());
        responseData.setData(serviceResponse.getData());
        if(serviceResponse.isSuccess())
        {
            responseData.setStatusCode(StatusCode.OK);
        }
        else
        {
            responseData.setStatusCode(StatusCode.BAD_REQUEST);
        }
        return ResponseEntity.status(responseData.getStatusCode()).body(responseData);
    }

}
