package uet.japit.k62.models.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum VoucherType {
    ALL, CATEGORY, ORGANIZER, EVENT;
    @JsonCreator
    public static VoucherType decode(final String code) {
        return valueOf(code);
    }
}
