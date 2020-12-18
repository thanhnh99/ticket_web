package uet.japit.k62.filters;

import org.springframework.data.jpa.domain.Specification;
import uet.japit.k62.models.entity.Event;

public final class EventFilter {
    public static Specification<Event> isActive(Boolean isActive)
    {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("isActive"), isActive);
    }


    public static Specification<Event> isBroadcasting(Boolean isBroadcasting)
    {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("isBroadcasting"), isBroadcasting);
    }
}
