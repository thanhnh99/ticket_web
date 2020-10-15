package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uet.japit.k62.models.entity.Category;
import uet.japit.k62.models.entity.Event;

import java.util.List;
import java.util.Optional;

@Repository
public interface IEventDAO extends JpaRepository<Event, String> {
    List<Optional<Event>> findByCategoryAndIsBroadcasting(Category category, Boolean isBroadcasting);

}
