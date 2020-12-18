package uet.japit.k62.models.response.data_response.payment;

import uet.japit.k62.models.request.payment.IPN;

public class VnPayIPN extends IPN {
    String status;
    String bookingId;
    @Override
    public boolean isSuccess() {
        return status.equals("00");
    }

    @Override
    public String getBookingId() {
        return bookingId;
    }

    public VnPayIPN(String status, String bookingId) {
        this.status = status;
        this.bookingId = bookingId;
    }
}
