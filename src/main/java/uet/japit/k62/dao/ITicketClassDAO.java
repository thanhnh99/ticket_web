package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import uet.japit.k62.models.entity.TicketClass;

import java.util.List;

@Repository
public interface ITicketClassDAO extends JpaRepository<TicketClass, String> {
    @Query("select t from TicketClass t where event_id = ?1")
    List<TicketClass> findByEventID(String event_id);

}
