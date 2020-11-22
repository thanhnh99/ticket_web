package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import uet.japit.k62.models.entity.User;

public interface IUserDAO extends JpaRepository<User, String> {
    User findByEmail(String email);
}
