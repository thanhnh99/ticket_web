package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uet.japit.k62.models.entity.Booking;

public interface IBookingDAO extends JpaRepository<Booking, String> {
    @Query(value = "select ifnull(sum(quantity),0) from booking, booking_detail where booking.event_id = ?1 and booking.status = 0"+
            " and TIMESTAMPDIFF(MINUTE, booking.created_at, NOW()) < 15 and booking.id = booking_detail.booking_id"+
            " and booking_detail.ticket_class_id = ?2", nativeQuery = true)
    int getNumberReservedTicket(String event_id, String ticket_id);
}
