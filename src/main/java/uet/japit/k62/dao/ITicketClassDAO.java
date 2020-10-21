package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;
import uet.japit.k62.models.entity.TicketClass;

@Repository
public interface ITicketClassDAO extends JpaRepository<TicketClass, String> {

}
