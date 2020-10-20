package uet.japit.k62.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import uet.japit.k62.exception.exception_define.common.UnAuthorException;
import uet.japit.k62.exception.exception_define.detail.EventNotFoundException;
import uet.japit.k62.models.request.ReqCreateEvent;
import uet.japit.k62.models.request.ReqCreateTicketClass;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.models.response.http_response.MessageResponse;
import uet.japit.k62.service.EventService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    EventService eventService;

    @PostMapping
    @PreAuthorize("@appAuthorizer.authorize(authentication, {T(uet.japit.k62.constant.PermissionConstant).ADD_EVENT})")
    public ResponseEntity<MessageResponse> addEvent(HttpServletRequest httpServletRequest,
                                                    @Valid @RequestBody ReqCreateEvent reqCreateEvent) throws Exception {
        MessageResponse response = eventService.addEvent(httpServletRequest, reqCreateEvent);
        return ResponseEntity.ok(response);
    }

    @GetMapping()
    public ResponseEntity<HttpResponse> getEvent(HttpServletRequest httpRequest)
    {
        HttpResponse response = eventService.getEvents(httpRequest);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/{event_id}")
    public ResponseEntity getEventById(@PathVariable(name = "event_id")  String eventId) throws EventNotFoundException {
        HttpResponse response = eventService.getEventById(eventId);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/search")
    public ResponseEntity searchEvent(@RequestParam(name = "category_id", required = false) String categoryId,
                                      @RequestParam(name = "end_time", required = false) Integer time,
                                      @RequestParam(name = "location", required = false) String location,
                                      @RequestParam(name = "price", required = false) Boolean price)
    {
        HttpResponse response = eventService.search(categoryId, time, location, price);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{event_id}/upload")
    @PreAuthorize("@appAuthorizer.authorize(authentication, {T(uet.japit.k62.constant.PermissionConstant).ADD_EVENT})")
    public ResponseEntity uploadImageForEvent(HttpServletRequest httpServletRequest,
                                              @RequestParam(name = "coverImage") @NotNull MultipartFile coverImage,
                                              @RequestParam(name = "mapImage") @NotNull MultipartFile mapImage,
                                              @PathVariable(name = "event_id") @NotNull String eventId) throws Exception {
        MessageResponse response =  eventService.uploadImage(httpServletRequest, coverImage, mapImage,eventId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{event_id}/ticket")
    @PreAuthorize("@appAuthorizer.authorize(authentication, {T(uet.japit.k62.constant.PermissionConstant).ADD_EVENT})")
    public ResponseEntity<MessageResponse> addTicket(HttpServletRequest httpServletRequest,
                                                     @NotNull @PathVariable(name = "event_id") String eventId,
                                                     @Valid @RequestBody List<ReqCreateTicketClass> requestData) throws EventNotFoundException, UnAuthorException {
        MessageResponse response = eventService.addTicketClass(httpServletRequest, requestData, eventId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{event_id}/ticket")
    public ResponseEntity<MessageResponse> getTicketByEventId(@NotNull @PathVariable(name = "event_id") String eventId) throws EventNotFoundException, UnAuthorException {
        MessageResponse response = eventService.getTicketClassesByEventId(eventId);
        return ResponseEntity.ok(response);
    }

}
