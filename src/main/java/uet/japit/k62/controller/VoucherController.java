package uet.japit.k62.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uet.japit.k62.exception.exception_define.detail.VoucherHasExistedException;
import uet.japit.k62.models.request.ReqCreateVoucher;
import uet.japit.k62.models.response.http_response.MessageResponse;
import uet.japit.k62.service.VoucherService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/voucher")
public class VoucherController {
    @Autowired
    VoucherService voucherService;
    @PreAuthorize("@appAuthorizer.authorize(authentication, {T(uet.japit.k62.constant.PermissionConstant).ADD_VOUCHER})")
    @PostMapping
    public ResponseEntity addVoucher(HttpServletRequest httpRequest,
                                     @Valid @RequestBody ReqCreateVoucher requestData) throws VoucherHasExistedException {
        MessageResponse responseData = voucherService.addVoucher(httpRequest,requestData);
        return ResponseEntity.ok(responseData);
    }
}
