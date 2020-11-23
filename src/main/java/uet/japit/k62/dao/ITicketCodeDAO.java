package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import uet.japit.k62.models.entity.TicketCode;

public interface ITicketCodeDAO extends JpaRepository<TicketCode, String> {

}
