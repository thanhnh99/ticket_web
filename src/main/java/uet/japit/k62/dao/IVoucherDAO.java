package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uet.japit.k62.models.entity.Voucher;

import java.util.Optional;

@Repository
public interface IVoucherDAO extends JpaRepository<Voucher, String> {
    Optional<Voucher> findByCode(String code);
}
