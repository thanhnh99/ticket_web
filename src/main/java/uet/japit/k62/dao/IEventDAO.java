package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import uet.japit.k62.models.entity.Event;

public interface IEventDAO extends JpaRepository<Event, String> {
}
