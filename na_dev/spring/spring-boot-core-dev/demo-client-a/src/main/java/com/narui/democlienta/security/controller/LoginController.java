package com.narui.democlienta.security.controller;

import com.narui.common.api.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Objects;

import javax.servlet.http.HttpServletResponse;

@Slf4j
@Controller
@RequestMapping("/login")
public class LoginController {

    @GetMapping
    public String loginPage() {
        return "login";
    }

    @GetMapping("/admin")
    public String adminLoginPage() {
        return "admin/login";
    }

    @GetMapping("/denied")
    public String deniedPage() {
        return "denied";
    }

    @GetMapping("/duplicated")
    public String duplicate(HttpServletResponse res) throws Exception {
        //throw new Exception("중복로그인");
        return "duplicated";
    }

    @PostMapping("/autoLogin")
    @ResponseBody
    public ResponseEntity<ApiResponse<UserDetails>> autoLogin(@AuthenticationPrincipal UserDetails userDetails) {
        return ApiResponse.toOkResponseEntity(userDetails);
    }

    @GetMapping("/rememberSession")
    public String rememberSession() {
        log.debug("rememberSession 페이지 이동");
        return "rememberSession";
    }
}
