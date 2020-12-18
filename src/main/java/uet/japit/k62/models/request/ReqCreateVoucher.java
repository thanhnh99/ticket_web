package uet.japit.k62.models.request;

import lombok.Data;
import uet.japit.k62.models.entity.VoucherType;
import uet.japit.k62.validator.DateRange;

import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.util.Date;

@Data
@DateRange(start ="startTime", end= "endTime")
public class ReqCreateVoucher {
    @NotNull
    private String code;
    @PositiveOrZero
    private long minOrder;
    @Min(0)
    @Max(100)
    private Integer discountPercentage;
    @Positive
    private BigDecimal maximumDiscount;
    private Date startTime;
    @Future
    private Date endTime;
    private VoucherType type;
    private String conditionValue;
    @Positive
    private Integer capacity;
}
