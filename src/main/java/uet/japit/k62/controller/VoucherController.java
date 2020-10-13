package uet.japit.k62.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uet.japit.k62.constant.MessageConstant;
import uet.japit.k62.constant.StatusCode;
import uet.japit.k62.exception.exception_define.detail.InvalidConditionException;
import uet.japit.k62.exception.exception_define.detail.VoucherHasExistedException;
import uet.japit.k62.exception.exception_define.detail.VoucherNotFoundException;
import uet.japit.k62.models.entity.Voucher;
import uet.japit.k62.models.request.ReqCreateVoucher;
import uet.japit.k62.models.response.data_response.ResVoucher;
import uet.japit.k62.models.response.http_response.HttpResponse;
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
                                     @Valid @RequestBody ReqCreateVoucher requestData) throws VoucherHasExistedException, InvalidConditionException {
        HttpResponse<Voucher> responseData = new HttpResponse<>(StatusCode.OK, MessageConstant.SUCCESS, voucherService.addVoucher(httpRequest,requestData));
        return ResponseEntity.ok(responseData);
    }
    @GetMapping("/{voucher_code}")
    public ResponseEntity getByCode(HttpServletRequest httpRequest, @PathVariable(value = "voucher_code") String code) throws VoucherNotFoundException {
        HttpResponse<ResVoucher> responseData = new HttpResponse<>(StatusCode.OK, MessageConstant.SUCCESS, voucherService.getByCode(code));
        return ResponseEntity.ok(responseData);
    }
}
