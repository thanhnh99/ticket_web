package uet.japit.k62.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.dao.ICategoryDAO;
import uet.japit.k62.dao.IUserDAO;
import uet.japit.k62.exception.exception_define.CategoryHasExistedException;
import uet.japit.k62.exception.exception_define.CategoryNotFoundException;
import uet.japit.k62.exception.exception_define.SuccessDataReturn;
import uet.japit.k62.models.entity.Category;
import uet.japit.k62.models.entity.User;
import uet.japit.k62.models.request.ReqCreateCategory;
import uet.japit.k62.models.request.ReqEditCategory;
import uet.japit.k62.models.response.service_response.ServiceResponse;
import uet.japit.k62.service.authorize.AttributeTokenService;
import uet.japit.k62.util.StringConvert;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@Service
public class CategoryService {
    @Autowired
    ICategoryDAO categoryDAO;

    @Autowired
    IUserDAO userDAO;

    public ServiceResponse addCategory(HttpServletRequest httpRequest, ReqCreateCategory requestData)
    {
        ServiceResponse response = new ServiceResponse();
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User userSendRequest = userDAO.findByEmail(emailSendRequest);

        //check category existed
        String categoryCode = StringConvert.convertStringToCode(requestData.getCategoryName());
        Category existedCategory = categoryDAO.findByCode(categoryCode);
        if(existedCategory != null)
        {
            throw new CategoryHasExistedException();
        }
        existedCategory = new Category();
        existedCategory.setCode(categoryCode);
        existedCategory.setName(requestData.getCategoryName());
        existedCategory.setCreatedBy(userSendRequest.getCreatedBy());
        categoryDAO.save(existedCategory);

        response.setStatus(true);
        response.setMessage(MessageConstant.SUCCESS);
        return response;
    }

    public ServiceResponse editCategory(HttpServletRequest httpRequest, ReqEditCategory requestData, String categoryId)
    {
        ServiceResponse response = new ServiceResponse();
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User userSendRequest = userDAO.findByEmail(emailSendRequest);

        //find Category
        Category editCategory = categoryDAO.findById(categoryId).get();
        if(editCategory == null)
        {
            throw new CategoryNotFoundException();
        }
        editCategory.setName(requestData.getName());
        editCategory.setCode(StringConvert.convertStringToCode(requestData.getName()));
        editCategory.setUpdatedBy(emailSendRequest);
        editCategory.setUpdatedAt(new Date());
        categoryDAO.save(editCategory);

        response.setStatus(true);
        response.setMessage(MessageConstant.SUCCESS);
        return response;
    }

    public ServiceResponse disableCategory(HttpServletRequest httpRequest, String categoryId)
    {
        ServiceResponse response = new ServiceResponse();
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);

        //find Category
        Category editCategory = categoryDAO.findById(categoryId).get();
        if(editCategory == null)
        {
            throw new CategoryNotFoundException();
        }
        editCategory.setIsActive(!editCategory.getIsActive());
        editCategory.setUpdatedBy(emailSendRequest);
        editCategory.setUpdatedAt(new Date());
        categoryDAO.save(editCategory);

        response.setStatus(true);
        response.setMessage(MessageConstant.SUCCESS);
        return response;
    }

    public ServiceResponse getAllCategories()
    {
        ServiceResponse response = new ServiceResponse();
        List<Category> categoryList = categoryDAO.findAll();
        throw new SuccessDataReturn(categoryList);
    }

}
