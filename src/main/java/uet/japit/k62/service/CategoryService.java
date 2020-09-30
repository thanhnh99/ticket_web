package uet.japit.k62.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.dao.ICategoryDAO;
import uet.japit.k62.dao.IUserDAO;
import uet.japit.k62.exception.exception_define.CategoryHasExistedException;
import uet.japit.k62.models.entity.Category;
import uet.japit.k62.models.entity.User;
import uet.japit.k62.models.request.ReqCreateCategory;
import uet.japit.k62.models.response.service_response.ServiceResponse;
import uet.japit.k62.service.authorize.AttributeTokenService;
import uet.japit.k62.util.StringConvert;

import javax.servlet.http.HttpServletRequest;

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
}
