package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import uet.japit.k62.models.entity.Booking;

import java.util.List;

public interface IBookingDAO extends JpaRepository<Booking, String> {
    @Query(value = "select ifnull(sum(quantity),0) from booking, booking_detail where booking.event_id = ?1 and booking.status = 0"+
            " and TIMESTAMPDIFF(MINUTE, booking.created_at, NOW()) < 15 and booking.id = booking_detail.booking_id"+
            " and booking_detail.ticket_class_id = ?2", nativeQuery = true)
    int getNumberReservedTicket(String event_id, String ticket_id);

    List<Booking> findByCreatedBy(String userId);
    @Transactional
    @Modifying
    @Query(value = "update booking set status = 2 where booking.status = 0"+
            " and TIMESTAMPDIFF(MINUTE, booking.created_at, NOW()) < 15", nativeQuery = true)
    void updateTimeout();
}
