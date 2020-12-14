package uet.japit.k62.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import uet.japit.k62.constant.AccountTypeConstant;
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.constant.PermissionConstant;
import uet.japit.k62.constant.StatusCode;
import uet.japit.k62.dao.ICategoryDAO;
import uet.japit.k62.dao.IEventDAO;
import uet.japit.k62.dao.ITicketClassDAO;
import uet.japit.k62.dao.IUserDAO;
import uet.japit.k62.exception.exception_define.common.UnAuthorException;
import uet.japit.k62.exception.exception_define.detail.CategoryNotFoundException;
import uet.japit.k62.exception.exception_define.detail.EventNotFoundException;
import uet.japit.k62.filters.EventFilter;
import uet.japit.k62.models.entity.Category;
import uet.japit.k62.models.entity.Event;
import uet.japit.k62.models.entity.TicketClass;
import uet.japit.k62.models.entity.User;
import uet.japit.k62.models.request.ReqCreateEvent;
import uet.japit.k62.models.request.ReqCreateTicketClass;
import uet.japit.k62.models.response.data_response.ResEvent;
import uet.japit.k62.models.response.data_response.ResTicketClass;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.models.response.http_response.MessageResponse;
import uet.japit.k62.service.authorize.AttributeTokenService;
import uet.japit.k62.util.ConvertEntityToResponse;
import uet.japit.k62.util.StringConvert;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {
    @Autowired
    private BlobManager blobManager;
    @Autowired
    IUserDAO userDAO;
    @Value("${azure.storage.container.name}")
    private String containerName;
    @Value("${storage.base-url}")
    private String storageUrl;
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
            String currentPath = new ClassPathResource("static/images").getURI().getPath();

            if(coverImage != null)
            {
                //upload CoverImage
                String coverName = "cover_" + eventId + "_" +System.currentTimeMillis()+ "_" + StringConvert.convertStringToCode(coverImage.getOriginalFilename()).replaceAll("\\s","");;
//                String saveToSeverPath = currentPath  + coverName;
//                String savetoDBPath = String.format("%s://%s:%d/",httpRequest.getScheme(),  httpRequest.getServerName(), httpRequest.getServerPort()) + "static/images/" + coverName;

//                coverImage.transferTo(new File(coverName));
                blobManager.createContainer(containerName);
                String savetoDBPath = blobManager.upload(coverImage).getPath();
                //Files.copy(coverImage.getInputStream(), locationPath.resolve(coverName));
                event.setCoverImageUrl(storageUrl + savetoDBPath);
            }

            if(mapImage != null)
            {
                //upload mapEvent Image
                String mapImageName = "map_" + eventId + "_" +System.currentTimeMillis()+ "_" + StringConvert.convertStringToCode(mapImage.getOriginalFilename());
//                String saveMapToSeverPath = currentPath +  mapImageName;
//                String saveMapToDBPath = String.format("%s://%s:%d/",httpRequest.getScheme(),  httpRequest.getServerName(), httpRequest.getServerPort()) + "static/images/" + mapImageName;
                //Files.copy(mapImage.getInputStream(), locationPath.resolve(mapImageName));
//                mapImage.transferTo(new File(mapImageName));
                blobManager.createContainer(containerName);
                String saveMapToDBPath = blobManager.upload(mapImage).getPath();
//
                event.setMapImageUrl(storageUrl + saveMapToDBPath);
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

    public HttpResponse search(HttpServletRequest httpRequest,
                               Specification<Event> specs) {
        HttpResponse response = new HttpResponse();
        String token = httpRequest.getHeader("Authorization");
        User userSendRequest = new User();
        if(token != null)
        {
            String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
            userSendRequest = userDAO.findByEmail(emailSendRequest);
        }
        if(token == null ||
                userSendRequest.getAccountType().equals(AccountTypeConstant.USER))
        {
//            specs = specs.and(EventFilter.isActive(true));
            specs = specs.and(EventFilter.isActive(true)).and(EventFilter.isBroadcasting(true));
        }
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

    public MessageResponse approveEvent(HttpServletRequest httpRequest,
                                        String eventId) throws UnAuthorException {
        MessageResponse response = new MessageResponse();
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User userSendRequest = userDAO.findByEmail(emailSendRequest);
        if(userSendRequest.getAccountType().equals(AccountTypeConstant.ROOT) ||
                (userSendRequest.hasPerMission(PermissionConstant.APPROVE_EVENT)))
        {
            Event event = eventDAO.findById(eventId).get();
            if(event.getIsBroadcasting())
            {
                event.setIsActive(true);
                event.setIsBroadcasting(false);
            } else {
                event.setIsActive(true);
                event.setIsBroadcasting(true);
            }
            eventDAO.save(event);
            return response;
        } else {
            throw new UnAuthorException();
        }
    }

    public MessageResponse cancelEvent(HttpServletRequest httpRequest,
                                        String eventId) throws UnAuthorException {
        MessageResponse response = new MessageResponse();
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User userSendRequest = userDAO.findByEmail(emailSendRequest);
        if(userSendRequest.getAccountType().equals(AccountTypeConstant.ROOT) ||
                (userSendRequest.hasPerMission(PermissionConstant.CANCEL_EVENT)))
        {
            Event event = eventDAO.findById(eventId).get();
            if(event.getIsActive())
            {
                event.setIsActive(false);
                event.setIsBroadcasting(false);
            } else {
                event.setIsActive(true);
            }

            eventDAO.save(event);
            return response;
        } else {
            throw new UnAuthorException();
        }
    }

    public MessageResponse makeEventIsPopular(HttpServletRequest httpRequest,
                                       String eventId) throws UnAuthorException {
        MessageResponse response = new MessageResponse();
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User userSendRequest = userDAO.findByEmail(emailSendRequest);
        if(userSendRequest.getAccountType().equals(AccountTypeConstant.ROOT) ||
                (userSendRequest.hasPerMission(PermissionConstant.MAKE_EVENT_POPULAR)))
        {
            Event event = eventDAO.findById(eventId).get();
            if(event.getIsPopular())
            {
                event.setIsActive(true);
                event.setIsBroadcasting(true);
                event.setIsPopular(false);
            }
            else
            {
                event.setIsActive(true);
                event.setIsBroadcasting(true);
                event.setIsPopular(true);
            }
            eventDAO.save(event);
            return response;
        } else {
            throw new UnAuthorException();
        }
    }

}
