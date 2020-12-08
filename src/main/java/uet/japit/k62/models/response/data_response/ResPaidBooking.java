package uet.japit.k62.models.response.data_response;

import uet.japit.k62.models.entity.Booking;
import uet.japit.k62.models.entity.TicketCode;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public class ResPaidBooking extends ResBooking {
    private List<ResTicketCode> tickets;

    public ResPaidBooking(Booking booking, List<TicketCode> tickets) {
        super(booking);
        this.tickets = tickets.stream().map(ticketCode -> new ResTicketCode(ticketCode.getCode(), ticketCode.getName())).collect(Collectors.toList());
    }

    public List<ResTicketCode> getTickets() {
        return tickets;
    }

    public void setTickets(List<ResTicketCode> tickets) {
        this.tickets = tickets;
    }


    public HashMap<String, Object> toMap() {
        HashMap<String, Object> mapper = new HashMap<>();
        mapper.put("tickets", tickets);
        mapper.put("event", getEvent());
        return mapper;
    }
}
