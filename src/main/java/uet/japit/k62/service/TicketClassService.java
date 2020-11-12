package uet.japit.k62.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.constant.StatusCode;
import uet.japit.k62.dao.IEventDAO;
import uet.japit.k62.dao.ITicketClassDAO;
import uet.japit.k62.dao.IUserDAO;
import uet.japit.k62.exception.exception_define.common.UnAuthorException;
import uet.japit.k62.exception.exception_define.detail.EventNotFoundException;
import uet.japit.k62.models.entity.Event;
import uet.japit.k62.models.entity.TicketClass;
import uet.japit.k62.models.entity.User;
import uet.japit.k62.models.request.ReqCreateTicketClass;
import uet.japit.k62.models.response.http_response.MessageResponse;
import uet.japit.k62.service.authorize.AttributeTokenService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class TicketClassService {
    @Autowired
    ITicketClassDAO ticketClassDAO;

    @Autowired
    IUserDAO userDAO;

    @Autowired
    IEventDAO eventDAO;


}
