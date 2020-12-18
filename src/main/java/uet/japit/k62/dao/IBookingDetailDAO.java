package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uet.japit.k62.models.entity.Booking;
import uet.japit.k62.models.entity.BookingDetail;

import java.util.List;

public interface IBookingDetailDAO extends JpaRepository<BookingDetail, String> {
    @Query("select b from BookingDetail b where booking = ?1")
    List<BookingDetail> findByBookingId(String bookingId);
    List<BookingDetail> findByBooking(Booking booking);
}
