package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import uet.japit.k62.models.entity.Permission;

import java.util.List;

public interface IPermissionDAO extends JpaRepository<Permission, String> {
    Permission findByCode(String code);
    List<Permission> findAll();
}
