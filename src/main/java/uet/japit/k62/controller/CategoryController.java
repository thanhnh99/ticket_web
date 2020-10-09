package uet.japit.k62.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uet.japit.k62.exception.exception_define.detail.CategoryHasExistedException;
import uet.japit.k62.exception.exception_define.detail.CategoryNotFoundException;
import uet.japit.k62.models.request.ReqCreateCategory;
import uet.japit.k62.models.request.ReqEditCategory;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.models.response.http_response.MessageResponse;
import uet.japit.k62.service.CategoryService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @PostMapping
    @PreAuthorize("@appAuthorizer.authorize(authentication, {T(uet.japit.k62.constant.PermissionConstant).ADD_CATEGORY})")
    public ResponseEntity addCategory(HttpServletRequest httpRequest, @RequestBody ReqCreateCategory requestData) throws CategoryHasExistedException {
        MessageResponse responseData = categoryService.addCategory(httpRequest,requestData);
        return ResponseEntity.ok(responseData);
    }

    @PutMapping
    @PreAuthorize("@appAuthorizer.authorize(authentication, {T(uet.japit.k62.constant.PermissionConstant).EDIT_CATEGORY})")
    public ResponseEntity editCategory(HttpServletRequest httpRequest,
                                      @RequestBody ReqEditCategory requestData,
                                      @PathVariable(name = "category_id") String categoryId) throws CategoryNotFoundException {
        MessageResponse responseData = categoryService.editCategory(httpRequest,requestData, categoryId);
        return ResponseEntity.ok(responseData);
    }

    @GetMapping
    public ResponseEntity getAllCategory()
    {
        HttpResponse responseData = categoryService.getAllCategories();
        return ResponseEntity.ok(responseData);
    }
}
