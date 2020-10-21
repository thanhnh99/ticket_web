package uet.japit.k62.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import uet.japit.k62.exception.exception_define.common.UnAuthorException;
import uet.japit.k62.exception.exception_define.detail.EventNotFoundException;
import uet.japit.k62.models.request.ReqCreateEvent;
import uet.japit.k62.models.request.ReqCreateTicketClass;
import uet.japit.k62.models.response.http_response.MessageResponse;
import uet.japit.k62.service.TicketClassService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
public class TicketClassController {
    @Autowired
    TicketClassService ticketClassService;


}
