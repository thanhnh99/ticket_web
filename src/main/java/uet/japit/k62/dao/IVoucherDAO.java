package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uet.japit.k62.models.entity.Voucher;
@Repository
public interface IVoucherDAO extends JpaRepository<Voucher, String> {
    Voucher findByCode(String code);
}
