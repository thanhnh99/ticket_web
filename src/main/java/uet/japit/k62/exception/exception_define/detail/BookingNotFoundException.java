package uet.japit.k62.exception.exception_define.detail;

import uet.japit.k62.exception.exception_define.common.EntityNotFoundException;

public class BookingNotFoundException extends EntityNotFoundException {
    public BookingNotFoundException() {
        super("booking not exist");
    }
}
