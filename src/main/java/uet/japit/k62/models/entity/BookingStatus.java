package uet.japit.k62.models.entity;

public enum BookingStatus {

    RESERVED(0), SUCCEED(1), FAILED(2);
    private int code;

    BookingStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
