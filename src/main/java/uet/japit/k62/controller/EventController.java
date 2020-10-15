package uet.japit.k62.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uet.japit.k62.exception.exception_define.detail.EventNotFoundException;
import uet.japit.k62.models.request.ReqCreateEvent;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.models.response.http_response.MessageResponse;
import uet.japit.k62.service.EventService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    EventService eventService;

    @PostMapping
    public ResponseEntity<MessageResponse> addEvent(HttpServletRequest httpServletRequest,
                                                    @Valid @RequestBody ReqCreateEvent reqCreateEvent) throws Exception {
        MessageResponse response = eventService.addEvent(httpServletRequest, reqCreateEvent);
        return ResponseEntity.ok(response);
    }

    @GetMapping()
    public ResponseEntity<HttpResponse> getEvent()
    {
        return null;
    }


    @GetMapping("/{event_id}")
    public ResponseEntity getEventById(@PathVariable(name = "event_id")  String eventId) throws EventNotFoundException {
        HttpResponse response = eventService.getEventById(eventId);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/search")
    public ResponseEntity searchEvent(@RequestParam(name = "category_id", required = false) String categoryId,
                                      @RequestParam(name = "start_time", required = false) Date startTime,
                                      @RequestParam(name = "end_time", required = false) Date endTime,
                                      @RequestParam(name = "location", required = false) String location,
                                      @RequestParam(name = "price", required = false) Boolean price)
    {
        HttpResponse response = eventService.search(categoryId, startTime, endTime, location, price);
        return ResponseEntity.ok(response);
    }

}
