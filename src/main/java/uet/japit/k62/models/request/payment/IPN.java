package uet.japit.k62.models.request.payment;

public abstract class IPN {
    public abstract boolean isSuccess();
    public abstract String getBookingId();
}
