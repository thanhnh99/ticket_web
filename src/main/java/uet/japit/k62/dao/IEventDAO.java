package uet.japit.k62.dao;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import uet.japit.k62.models.entity.Category;
import uet.japit.k62.models.entity.Event;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RepositoryRestResource
@Transactional(rollbackOn = Exception.class)
public interface IEventDAO extends JpaRepository<Event, String>, JpaSpecificationExecutor<Event> {
    Optional<Event> findById(String id);
    List<Event> findByIsBroadcastingAndIsActive(Boolean isBroadcasting, Boolean isActive);
//    List<Event> findByIsBroadcastingAndIsActive(Boolean isActive, Boolean isBroadcasting, Specification specification);

}
