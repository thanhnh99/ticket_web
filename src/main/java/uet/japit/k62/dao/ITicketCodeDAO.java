package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uet.japit.k62.models.entity.TicketCode;

import java.util.List;

public interface ITicketCodeDAO extends JpaRepository<TicketCode, String> {
    @Query(value = "SELECT *  from ticket_code t, booking_detail WHERE booking_detail.booking_id =  ?1 and booking_detail.id = t.booking_id", nativeQuery = true)
    List<TicketCode> getTicketCodeByBooking(String bookingId);
}
