package uet.japit.k62.validator;

import org.springframework.beans.BeanWrapperImpl;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Date;

public class DateRangeValidator implements ConstraintValidator<DateRange, Object> {
    private String start;
    private String end;
    @Override
    public boolean isValid(Object value, ConstraintValidatorContext constraintValidatorContext) {
        Object startDate = new BeanWrapperImpl(value)
                .getPropertyValue(start);
        Object endDate = new BeanWrapperImpl(value)
                .getPropertyValue(end);

        if (! (startDate instanceof Date) || ! (endDate instanceof Date)) {
            return false;
        } else {
            return (((Date) startDate).compareTo((Date) endDate) <= 0);
        }
    }

    @Override
    public void initialize(DateRange constraintAnnotation) {
        this.start = constraintAnnotation.start();
        this.end = constraintAnnotation.end();
    }
}
