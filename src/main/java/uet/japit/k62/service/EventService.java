package uet.japit.k62.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import uet.japit.k62.constant.AccountTypeConstant;
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.constant.PermissionConstant;
import uet.japit.k62.constant.StatusCode;
import uet.japit.k62.dao.*;
import uet.japit.k62.exception.exception_define.common.UnAuthorException;
import uet.japit.k62.exception.exception_define.detail.CategoryNotFoundException;
import uet.japit.k62.exception.exception_define.detail.EventNotFoundException;
import uet.japit.k62.models.entity.*;
import uet.japit.k62.models.request.ReqCreateEvent;
import uet.japit.k62.models.request.ReqCreateTicketClass;
import uet.japit.k62.models.response.data_response.ResEvent;
import uet.japit.k62.models.response.data_response.ResHomeEvent;
import uet.japit.k62.models.response.data_response.ResTicketClass;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.models.response.http_response.MessageResponse;
import uet.japit.k62.service.authorize.AttributeTokenService;
import uet.japit.k62.util.ConvertEntityToResponse;
import uet.japit.k62.util.StringConvert;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class EventService {

    @Autowired
    IUserDAO userDAO;

    @Autowired
    IEventDAO eventDAO;

    @Autowired
    ICategoryDAO categoryDAO;

    @Autowired
    ITicketClassDAO ticketClassDAO;


    public HttpResponse addEvent(HttpServletRequest httpRequest, ReqCreateEvent requestData) throws Exception {
        HttpResponse response = new HttpResponse();
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User userSendRequest = userDAO.findByEmail(emailSendRequest);
        Category category = categoryDAO.findById(requestData.getCategoryId()).get();
        if(category == null)
        {
            throw new CategoryNotFoundException();
        }
        Event newEvent = new Event(requestData);
        newEvent.setCategory(category);
        newEvent.setCreatedBy(userSendRequest.getEmail());
        eventDAO.save(newEvent);
        response.setStatusCode(StatusCode.OK);
        response.setMessage(MessageConstant.SUCCESS);
        response.setData(new ResEvent(newEvent));
        return response;
    }

    public MessageResponse uploadImage(HttpServletRequest httpRequest,
                                       MultipartFile coverImage,
                                       MultipartFile mapImage,
                                       String eventId) throws Exception {
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User userSendRequest = userDAO.findByEmail(emailSendRequest);
        Event event = eventDAO.findById(eventId).get();
        if(event == null)
        {
            throw new EventNotFoundException();
        }
        if(emailSendRequest.equals(event.getCreatedBy()) ||
            userSendRequest.getAccountType().equals(AccountTypeConstant.ROOT)
        )
        {
            String currentPath = Paths.get("").toAbsolutePath().toString();
            if(coverImage != null)
            {
                //upload CoverImage
                String coverName = "cover_" + eventId + "_" +System.currentTimeMillis()+ "_" + StringConvert.convertStringToCode(coverImage.getOriginalFilename()).replaceAll("\\s","");;
                String saveToSeverPath = currentPath + "/src/main/resources/static/images/" + coverName;
                String savetoDBPath = String.format("%s://%s:%d/",httpRequest.getScheme(),  httpRequest.getServerName(), httpRequest.getServerPort()) + "static/images/" + coverName;
                coverImage.transferTo(new File(saveToSeverPath));
                //Files.copy(coverImage.getInputStream(), locationPath.resolve(coverName));
                event.setCoverImageUrl(savetoDBPath);
            }

            if(mapImage != null)
            {
                //upload mapEvent Image
                String mapImageName = "map_" + eventId + "_" +System.currentTimeMillis()+ "_" + StringConvert.convertStringToCode(mapImage.getOriginalFilename());
                String saveMapToSeverPath = currentPath + "/src/main/resources/static/images/" + mapImageName;
                String saveMapToDBPath = String.format("%s://%s:%d/",httpRequest.getScheme(),  httpRequest.getServerName(), httpRequest.getServerPort()) + "static/images/" + mapImageName;
                //Files.copy(mapImage.getInputStream(), locationPath.resolve(mapImageName));
                mapImage.transferTo(new File(saveMapToSeverPath));
                event.setMapImageUrl(saveMapToDBPath);
            }
            eventDAO.save(event);
            return new MessageResponse(StatusCode.OK, MessageConstant.SUCCESS);
        }
        else
        {
            throw new UnAuthorException();
        }
    }
    public MessageResponse addTicketClass(HttpServletRequest httpRequest,
                                          List<ReqCreateTicketClass> ticketClassList,
                                          String eventId) throws EventNotFoundException, UnAuthorException {
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User userSendRequest = userDAO.findByEmail(emailSendRequest);
        Event event = eventDAO.findById(eventId).get();
        if(event == null)
        {
            throw new EventNotFoundException();
        }
        //Create TicketClass
        else if(!userSendRequest.getEmail().equals(event.getCreatedBy()))
        {
            throw new UnAuthorException();
        }
        for (ReqCreateTicketClass ticketClass : ticketClassList)
        {
            TicketClass ticketClassEntity = new TicketClass(ticketClass);
            ticketClassEntity.setEvent(event);
            ticketClassDAO.save(ticketClassEntity);
            event.getTicketClasses().add(ticketClassEntity);
        }
        eventDAO.save(event);
        return new MessageResponse(StatusCode.OK, MessageConstant.SUCCESS);
    }

    public HttpResponse getEvents(HttpServletRequest httpRequest)
    {

        String token = httpRequest.getHeader("Authorization");
        List<?> eventList = new ArrayList<>();
        if(token != null)
        {
            String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
            User userSendRequest = userDAO.findByEmail(emailSendRequest);
            if(!userSendRequest.getAccountType().getCode().equals(AccountTypeConstant.USER))
            {
                eventList =  ConvertEntityToResponse.ConvertListEventEntity(eventDAO.findAll());
                return  new HttpResponse(eventList);
            }
            else
            {
                eventList =  ConvertEntityToResponse.ConvertListHomeEventEntity(eventDAO.findByIsBroadcastingAndIsActive(true, true));
                return  new HttpResponse(eventList);
            }
        }
        else
        {
            eventList = ConvertEntityToResponse.ConvertListHomeEventEntity(eventDAO.findByIsBroadcastingAndIsActive(true, true));
            return  new HttpResponse(eventList);
        }
    }

    public HttpResponse<ResTicketClass> getTicketClassesByEventId(String eventId) throws EventNotFoundException {
        Event event = eventDAO.findById(eventId).get();
        if(event == null)
        {
            throw new EventNotFoundException();
        }
        List<ResTicketClass> resData = ConvertEntityToResponse.ConvertListTicketClassEntity((List<TicketClass>) event.getTicketClasses());
        return new HttpResponse(resData);
    }

    public HttpResponse getEventById(String eventId) throws EventNotFoundException {
        Event event = eventDAO.findById(eventId).get();
        if(event == null || !event.getIsActive())
        {
            throw new EventNotFoundException();
        }
        ResEvent resData = new ResEvent(event);
        return new HttpResponse(resData);
    }

    public HttpResponse search(Specification<Event> specs) {
        HttpResponse response = new HttpResponse();
        List<Event> eventsEntity = eventDAO.findAll(Specification.where(specs));
        List<ResEvent> eventsResponse = ConvertEntityToResponse.ConvertListEventEntity(eventsEntity);
        response.setData(eventsResponse);;
        return response;
    }

    public HttpResponse editEvent(HttpServletRequest httpRequest,
                                  ReqCreateEvent reqEditEvent,
                                  String eventId) throws UnAuthorException {
        Event event = eventDAO.findById(eventId).get();
        HttpResponse response = new HttpResponse();
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User userSendRequest = userDAO.findByEmail(emailSendRequest);
        if(userSendRequest.getAccountType().getCode().equals(AccountTypeConstant.ROOT)
        ||userSendRequest.getAccountType().getCode().equals(AccountTypeConstant.ADMIN)
            || userSendRequest.getEmail().equals(event.getCreatedBy()))
        {
            Event newEvent = new Event(reqEditEvent);
            newEvent.setId(eventId);
            Category category = categoryDAO.findById(reqEditEvent.getCategoryId()).get();
            newEvent.setCategory(category);
            newEvent.setCreatedBy(userSendRequest.getEmail());
            eventDAO.save(newEvent);
            response.setData(new ResEvent(newEvent));
            return response;
        }
        else throw new UnAuthorException();
    }

    public MessageResponse deleteEvent(HttpServletRequest httpRequest,
                                       String eventId) throws UnAuthorException {
        Event event = eventDAO.findById(eventId).get();
        MessageResponse response = new MessageResponse();
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User userSendRequest = userDAO.findByEmail(emailSendRequest);
        if(userSendRequest.getAccountType().getCode().equals(AccountTypeConstant.ROOT)
                ||userSendRequest.getAccountType().getCode().equals(AccountTypeConstant.ADMIN)
                || userSendRequest.getEmail().equals(event.getCreatedBy()))
        {
            event.setIsActive(false);
            eventDAO.save(event);
            return response;
        }
        else throw new UnAuthorException();
    }
}
