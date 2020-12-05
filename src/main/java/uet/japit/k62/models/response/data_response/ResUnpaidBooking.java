package uet.japit.k62.models.response.data_response;

import uet.japit.k62.models.entity.Booking;

import java.util.List;
public class ResUnpaidBooking extends ResBooking {
    public ResUnpaidBooking(Booking booking, List<ResBookingDetail> tickets) {
        super(booking);
        this.tickets = tickets;
    }
    private List<ResBookingDetail> tickets;

    public List<ResBookingDetail> getTickets() {
        return tickets;
    }

    public void setTickets(List<ResBookingDetail> tickets) {
        this.tickets = tickets;
    }
}
