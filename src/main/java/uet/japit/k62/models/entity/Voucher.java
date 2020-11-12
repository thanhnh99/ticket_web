package uet.japit.k62.models.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Voucher extends BaseEntity{

    @Column(unique = true)
    private String code;
    private String minOrder;
    private Integer discountPercentage;
    private BigDecimal maximumDiscount;
    private Date startTime;
    private Date endTime;
    private VoucherType type;
    private String conditionValue;
    private Integer capacity;
}
