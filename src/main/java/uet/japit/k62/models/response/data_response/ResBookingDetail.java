package uet.japit.k62.models.response.data_response;

import lombok.Data;

import java.math.BigDecimal;
@Data
public class ResBookingDetail {
    private String name;
    private BigDecimal price;
    private int amout;

    public ResBookingDetail(String name, BigDecimal price, int quantity) {
        this.name = name;
        this.price = price;
        this.amout = quantity;
    }
}
