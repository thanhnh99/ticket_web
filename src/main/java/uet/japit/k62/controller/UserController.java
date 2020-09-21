package uet.japit.k62.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uet.japit.k62.dao.IPermissionDAO;
import uet.japit.k62.models.entity.Permission;
import uet.japit.k62.models.response.http_response.HttpResponse;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    IPermissionDAO permissionDAO;

    @PostMapping
    @PreAuthorize("@appAuthorizer.authorize(authentication, {'CHANGE_ACCOUNT_TYPE'})")
    public ResponseEntity<HttpResponse> changeAccountType()
    {
        List<Permission> permissionList = permissionDAO.findAll();
        return null;
    }

}
