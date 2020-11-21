package uet.japit.k62.service.payment;

import uet.japit.k62.exception.exception_define.detail.PaymentCreateRequestException;

public interface IPayment {
    String createPaymentRequest(String requestId, long amount, String userEmail) throws PaymentCreateRequestException;
    void verifyPayment();

}
