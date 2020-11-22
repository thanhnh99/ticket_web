package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import uet.japit.k62.models.entity.AccountType;

public interface IAccountTypeDAO extends JpaRepository<AccountType, String> {
    AccountType findByCode(String code);
}
