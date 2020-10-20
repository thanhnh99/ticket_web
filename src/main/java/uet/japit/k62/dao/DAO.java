package uet.japit.k62.dao;

import org.springframework.stereotype.Repository;
import uet.japit.k62.models.entity.Event;

import javax.management.Query;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
@Repository
public class DAO {

    @PersistenceContext
    private EntityManager em;

    public  List<Event> search(String query)
    {
        return  em.createQuery(query).getResultList();
    }
}
