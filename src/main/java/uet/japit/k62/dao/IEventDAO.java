package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import uet.japit.k62.models.entity.Category;
import uet.japit.k62.models.entity.Event;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RepositoryRestResource
@Transactional(rollbackOn = Exception.class)
public interface IEventDAO extends JpaRepository<Event, String>, JpaSpecificationExecutor<Event> {
    Optional<Event> findById(String id);
    List<Optional<Event>> findByCategoryAndIsBroadcasting(Category category, Boolean isBroadcasting);
    List<Event> findByIsBroadcastingAndIsActive(Boolean isBroadcasting, Boolean isActive);

}
