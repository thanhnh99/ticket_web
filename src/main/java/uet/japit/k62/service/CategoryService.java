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
import uet.japit.k62.models.response.data_response.ResCategory;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.models.response.http_response.MessageResponse;
import uet.japit.k62.service.authorize.AttributeTokenService;
import uet.japit.k62.util.ConvertEntityToResponse;
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

    public MessageResponse addCategory(HttpServletRequest httpRequest, ReqCreateCategory requestData)
    {
        MessageResponse response = new MessageResponse();
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

        response.setMessage(MessageConstant.SUCCESS);
        return response;
    }

    public MessageResponse editCategory(HttpServletRequest httpRequest, ReqEditCategory requestData, String categoryId)
    {
        MessageResponse response = new MessageResponse();
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

        response.setMessage(MessageConstant.SUCCESS);
        return response;
    }

    public MessageResponse disableCategory(HttpServletRequest httpRequest, String categoryId)
    {
        MessageResponse response = new MessageResponse();
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

        response.setMessage(MessageConstant.SUCCESS);
        return response;
    }

    public HttpResponse getAllCategories()
    {
        HttpResponse response = new HttpResponse();
        List<ResCategory> categoryList = ConvertEntityToResponse.ConvertCategory(categoryDAO.findAll());
        response.setData(categoryList);
        return response;
    }

}
