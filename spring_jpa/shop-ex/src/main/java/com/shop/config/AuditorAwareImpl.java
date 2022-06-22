package com.shop.config;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuditorAwareImpl implements AuditorAware<String> {

	@Override
	public Optional<String> getCurrentAuditor() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userName = "";
		if (authentication != null) {
			userName = authentication.getName();
		}
		return Optional.of(userName);	// 로그인한 사용자 정보를 조회하여 사용자이름을 등록자와 수정자로 지정
	}

}
