package uet.japit.k62.service;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import uet.japit.k62.dao.ICategoryDAO;
import uet.japit.k62.dao.IEventDAO;
import uet.japit.k62.dao.IUserDAO;
import uet.japit.k62.dao.IVoucherDAO;
import uet.japit.k62.exception.exception_define.detail.InvalidConditionException;
import uet.japit.k62.exception.exception_define.detail.VoucherHasExistedException;
import uet.japit.k62.exception.exception_define.detail.VoucherNotFoundException;
import uet.japit.k62.models.entity.User;
import uet.japit.k62.models.entity.Voucher;
import uet.japit.k62.models.entity.VoucherType;
import uet.japit.k62.models.request.ReqCreateVoucher;
import uet.japit.k62.models.response.data_response.ResVoucher;
import uet.japit.k62.service.authorize.AttributeTokenService;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@Service
public class VoucherService {
    @Autowired
    IVoucherDAO voucherDAO;
    @Autowired
    IUserDAO userDAO;
    @Autowired
    IEventDAO eventDAO;
    @Autowired
    ICategoryDAO categoryDAO;

    public ResVoucher addVoucher(HttpServletRequest httpRequest,
                                            @RequestBody ReqCreateVoucher requestData) throws VoucherHasExistedException, InvalidConditionException {
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User userSendRequest = userDAO.findByEmail(emailSendRequest);

        //check voucher existed
        String voucherCode = requestData.getCode();

        if(voucherDAO.findByCode(voucherCode).isPresent())
        {
            throw new VoucherHasExistedException();
        }

        // check voucher condition invalid
        if( (requestData.getType() == VoucherType.EVENT && !eventDAO.existsById(requestData.getConditionValue()))
            || (requestData.getType() == VoucherType.CATEGORY && categoryDAO.existsById(requestData.getConditionValue()))
            || (requestData.getType() == VoucherType.ORGANIZER && !userSendRequest.getId().equals(requestData.getConditionValue()))){
            throw new InvalidConditionException();
        }

        Voucher voucher = new ModelMapper().map(requestData, Voucher.class);
        voucher.setCreatedBy(userSendRequest.getId());
        voucherDAO.save(voucher);
        return new ModelMapper().map(voucher, ResVoucher.class);
    }

    public ResVoucher getByCode(String code) throws VoucherNotFoundException {
        Voucher voucher =  voucherDAO.findByCode(code).orElseThrow(VoucherNotFoundException::new);
        return new ModelMapper().map(voucher, ResVoucher.class);
    }
    public List<ResVoucher> getByEvent(String eventId) {
        List<Voucher> vouchers =  voucherDAO.getAvailableVoucher(VoucherType.EVENT, eventId);
        List<Voucher> vouchersByAll =  voucherDAO.findByTypeAndEndTimeAfter(VoucherType.ALL, new Date());
        vouchers.addAll(vouchersByAll);
        return new ModelMapper().map(vouchers, new TypeToken<List<ResVoucher>>() {}.getType());
    }
    public List<ResVoucher> getVoucherCreatedBy(HttpServletRequest httpRequest ) {
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User userSendRequest = userDAO.findByEmail(emailSendRequest);
        List<Voucher> vouchers =  voucherDAO.findByCreatedBy(userSendRequest.getId());
        return new ModelMapper().map(vouchers, new TypeToken<List<ResVoucher>>() {}.getType());

    }
}
