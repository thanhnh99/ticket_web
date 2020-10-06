package uet.japit.k62.models.request;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class ReqCreateVoucher {
    private String code;
    private String organizerId;
    private String minOrder;
    private Integer discountPercentage;
    private BigDecimal maximumDiscount;
    private Date startTime;
    private Date endTime;

}
