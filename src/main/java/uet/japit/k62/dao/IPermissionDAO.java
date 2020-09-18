package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import uet.japit.k62.models.entity.Permission;

public interface IPermissionDAO extends JpaRepository<Permission, String> {
}
