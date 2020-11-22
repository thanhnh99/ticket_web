package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uet.japit.k62.models.entity.Category;

@Repository
public interface ICategoryDAO extends JpaRepository<Category, String> {
    Category findByCode(String code);
}
