package uet.japit.k62.dao;

import jdk.internal.dynalink.linker.LinkerServices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uet.japit.k62.models.entity.DecisiveTreeCondition;

import java.util.List;

@Repository
public interface IDecisiveTreeConditionDAO  extends JpaRepository<DecisiveTreeCondition, String> {
}
