package uet.japit.k62.models.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Voucher extends BaseEntity{
    private String code;
    private String organizerId;
    private String minOrder;
    private Integer discountPercentage;
    private BigDecimal maximumDiscount;
}
