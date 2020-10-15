package uet.japit.k62.models.request;

import lombok.Data;

@Data
public class ReqCreateLocation {
    private String fullAddress;
    private String city;
    private String district;
    private String commune;
    private String eventId;
}
