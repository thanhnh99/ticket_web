package uet.japit.k62.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.dao.IUserDAO;
import uet.japit.k62.dao.IVoucherDAO;
import uet.japit.k62.exception.exception_define.CategoryHasExistedException;
import uet.japit.k62.exception.exception_define.VoucherHasExistedException;
import uet.japit.k62.models.entity.Category;
import uet.japit.k62.models.entity.User;
import uet.japit.k62.models.entity.Voucher;
import uet.japit.k62.models.request.ReqChangeAccountType;
import uet.japit.k62.models.request.ReqCreateVoucher;
import uet.japit.k62.models.response.http_response.HttpResponse;
import uet.japit.k62.models.response.http_response.MessageResponse;
import uet.japit.k62.service.authorize.AttributeTokenService;
import uet.japit.k62.util.StringConvert;

import javax.servlet.http.HttpServletRequest;

@Service
public class VoucherService {
    @Autowired
    IVoucherDAO voucherDAO;
    @Autowired
    IUserDAO userDAO;
    @Autowired
    ModelMapper mapper;
    public MessageResponse addVoucher(HttpServletRequest httpRequest,
                                                   @RequestBody ReqCreateVoucher requestData) throws VoucherHasExistedException {
        MessageResponse response = new MessageResponse();
        String token = httpRequest.getHeader("Authorization");
        String emailSendRequest = AttributeTokenService.getEmailFromToken(token);
        User userSendRequest = userDAO.findByEmail(emailSendRequest);

        //check category existed
        String voucherCode = requestData.getCode();
        Voucher voucher = voucherDAO.findByCode(voucherCode);
        if(voucher != null)
        {
            throw new VoucherHasExistedException();
        }
        voucher = mapper.map(requestData, Voucher.class);
        voucher.setCreatedBy(userSendRequest.getId());
        voucher.setOrganizerId(userSendRequest.getId());
        voucherDAO.save(voucher);

        response.setMessage(MessageConstant.SUCCESS);
        return response;
    }
}
