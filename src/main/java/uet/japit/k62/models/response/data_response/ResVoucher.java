package uet.japit.k62.models.response.data_response;

import lombok.Data;
import uet.japit.k62.models.entity.VoucherType;

import java.math.BigDecimal;
import java.util.Date;
@Data
public class ResVoucher {
    private String code;
    private long minOrder;
    private Integer discountPercentage;
    private BigDecimal maximumDiscount;
    private Date startTime;
    private Date endTime;
    private VoucherType type;
    private String conditionValue;
    private Integer capacity;
}
