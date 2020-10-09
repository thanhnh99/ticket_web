package uet.japit.k62.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.dao.IEventDAO;
import uet.japit.k62.dao.IUserDAO;
import uet.japit.k62.exception.exception_define.detail.CategoryHasExistedException;
import uet.japit.k62.models.entity.Category;
import uet.japit.k62.models.entity.User;
import uet.japit.k62.models.request.ReqCreateCategory;
import uet.japit.k62.models.request.ReqCreateEvent;
import uet.japit.k62.models.response.http_response.MessageResponse;
import uet.japit.k62.service.authorize.AttributeTokenService;
import uet.japit.k62.util.StringConvert;

import javax.servlet.http.HttpServletRequest;

@Service
public class EventService {

    @Autowired
    IUserDAO userDAO;

    @Autowired
    IEventDAO eventDAO;

    public MessageResponse addEvent(HttpServletRequest httpRequest, ReqCreateEvent requestData) {
        MessageResponse response = new MessageResponse();
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User userSendRequest = userDAO.findByEmail(emailSendRequest);
        return null;

    }
}
