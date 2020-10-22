package uet.japit.k62.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uet.japit.k62.dao.ITicketClassDAO;
import uet.japit.k62.models.entity.TicketClass;
import uet.japit.k62.models.response.data_response.ResTicketClass;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {
    @Autowired
    private ITicketClassDAO ticketDao;
    public List<ResTicketClass> getTicketInfo(String event_id){
        List<TicketClass> tickets = ticketDao.findByEventID(event_id);
        return tickets.stream().map(ResTicketClass::new).collect(Collectors.toList());
    }
}
