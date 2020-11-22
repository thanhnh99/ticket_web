package uet.japit.k62.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uet.japit.k62.constant.ErrorConstant;
import uet.japit.k62.constant.StatusCode;
import uet.japit.k62.dao.ICategoryDAO;
import uet.japit.k62.dao.IUserDAO;
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
        try {
            String token = httpRequest.getHeader("Authorization");
            String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
            User userSendRequest = userDAO.findByEmail(emailSendRequest);

            //check category existed
            String categoryCode = StringConvert.convertStringToCode(requestData.getCategoryName());
            Category existedCategory = categoryDAO.findByCode(categoryCode);
            if(existedCategory == null)
            {
                existedCategory = new Category();
                existedCategory.setCode(categoryCode);
                existedCategory.setName(requestData.getCategoryName());
                existedCategory.setCreatedBy(userSendRequest.getCreatedBy());
                categoryDAO.save(existedCategory);

                response.setStatus(true);
                response.setMessage(ErrorConstant.SUCCESS);
            }
            else
            {
                response.setMessage(ErrorConstant.CATEGORY_HAS_EXISTED);
            }
        } catch (Exception e)
        {
            System.out.println("Err in CategoryService.addCategory: " + e.getMessage());
            response.setMessage(ErrorConstant.HAS_EXCEPTION);
        }
        return response;
    }
}
