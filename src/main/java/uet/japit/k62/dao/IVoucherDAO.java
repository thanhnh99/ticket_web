package uet.japit.k62.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import uet.japit.k62.models.entity.Voucher;
import uet.japit.k62.models.entity.VoucherType;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface IVoucherDAO extends JpaRepository<Voucher, String> {
    Optional<Voucher> findByCode(String code);
    @Query(value = "SELECT v FROM Voucher v WHERE type = ?1 and conditionValue = ?2 and endTime > current_date")
    List<Voucher> getAvailableVoucher(VoucherType type, String conditionValue);
//    @Query(value = "SELECT v FROM Voucher v WHERE type = ?1 and endTime > ?2")
    List<Voucher> findByTypeAndEndTimeAfter(VoucherType type, Date endTime);
    List<Voucher> findByCreatedBy(String userId);
}
