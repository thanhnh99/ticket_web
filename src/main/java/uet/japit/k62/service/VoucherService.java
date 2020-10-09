package uet.japit.k62.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.dao.IUserDAO;
import uet.japit.k62.dao.IVoucherDAO;
import uet.japit.k62.exception.exception_define.detail.VoucherHasExistedException;
import uet.japit.k62.models.entity.User;
import uet.japit.k62.models.entity.Voucher;
import uet.japit.k62.models.request.ReqCreateVoucher;
import uet.japit.k62.models.response.http_response.MessageResponse;
import uet.japit.k62.service.authorize.AttributeTokenService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Service
public class VoucherService {
    @Autowired
    IVoucherDAO voucherDAO;
    @Autowired
    IUserDAO userDAO;
    public MessageResponse addVoucher(HttpServletRequest httpRequest,
                                                   @RequestBody ReqCreateVoucher requestData) throws VoucherHasExistedException {
        MessageResponse response = new MessageResponse();
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User userSendRequest = userDAO.findByEmail(emailSendRequest);

        //check voucher existed
        String voucherCode = requestData.getCode();
        Voucher voucher = voucherDAO.findByCode(voucherCode);
        if(voucher != null)
        {
            throw new VoucherHasExistedException();
        }
        // check voucher condition valid
        voucher = new ModelMapper().map(requestData, Voucher.class);
        voucher.setCreatedBy(userSendRequest.getId());
        voucherDAO.save(voucher);

        response.setMessage(MessageConstant.SUCCESS);
        return response;
    }
}
