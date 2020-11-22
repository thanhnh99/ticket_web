package uet.japit.k62.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uet.japit.k62.models.request.ReqCreateCategory;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.models.response.service_response.ServiceResponse;
import uet.japit.k62.service.CategoryService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @PostMapping
    @PreAuthorize("@appAuthorizer.authorize(authentication, {T(uet.japit.k62.constant.PermissionConstant).ADD_CATEGORY})")
    public ResponseEntity addCategory(HttpServletRequest httpRequest, @RequestBody ReqCreateCategory requestData)
    {
        HttpResponse responseData = new HttpResponse();
        ServiceResponse serviceResponse = categoryService.addCategory(httpRequest,requestData);
        return ServiceResponse.getHttpResponseResponseEntity(responseData, serviceResponse);
    }
}
