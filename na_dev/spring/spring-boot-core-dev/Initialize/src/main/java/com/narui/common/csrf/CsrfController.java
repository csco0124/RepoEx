package com.narui.common.csrf;


import javax.servlet.http.HttpServletRequest;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CsrfController {
	
	/**
	 * postman 등에서의 데이터 테스트를 할 수 있도록 CSRF 토큰 강제 생성
	 * @param request
	 */
	@GetMapping("/csrf")
    public CsrfToken getCsrfToken(HttpServletRequest request) {
        return (CsrfToken) request.getAttribute(CsrfToken.class.getName());
    }
	@GetMapping("/api/csrf")
    public CsrfToken getApiCsrfToken(HttpServletRequest request) {
        return (CsrfToken) request.getAttribute(CsrfToken.class.getName());
    }
}
