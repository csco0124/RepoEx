package com.narui.bauth.domain.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.narui.common.api.ApiResponse;
import com.narui.common.api.ParamException;
import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.domain.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class CustomerSigninController {

    private final UserService userService;

    /**
     * 계정 조회
     */
    @Operation(summary = "계정 조회")
    @PostMapping("/public/api/accountlookup")
    @ResponseBody
    public ResponseEntity<ApiResponse<UserDto.AccountLookupRes>> accountlookup(
            @RequestBody @Validated UserDto.AccountLookupReq accountLookupReq, Errors errors) throws Exception {
        if (errors.hasErrors()) {
            throw new ParamException(errors);
        }

        UserDto.AccountLookupRes accountLookupRes = userService.accountlookup(accountLookupReq);

        return ApiResponse.toOkResponseEntity(accountLookupRes);
    }
}
