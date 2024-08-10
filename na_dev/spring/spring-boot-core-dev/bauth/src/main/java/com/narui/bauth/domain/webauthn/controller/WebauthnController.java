package com.narui.bauth.domain.webauthn.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.domain.user.service.UserService;
import com.narui.bauth.domain.webauthn.specification.AuthTypeSpecificationBuilder;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.common.api.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/private/api/webauthn")
public class WebauthnController {

	private final UserService userService;

	public WebauthnController(UserService userService) {
		this.userService = userService;
	}

	@Operation(summary = "소셜/생체인증 사용자 조회")
	@PostMapping("/grid")
	public ResponseEntity<ApiResponse<Page<UserDto.authTypeResDto>>> getSocialAndWebauthnUseMember(
			@Validated @RequestBody UserDto.authTypeReqDto req) {

		// 검색조건 세팅
		AuthTypeSpecificationBuilder specificationBuilder = new AuthTypeSpecificationBuilder();
		List<SearchCriteria> criteriaList = req.getSearchCriteriaList();
		if (criteriaList != null) {
			criteriaList.forEach(x -> {
				x.setDataOption(req.getDataOption());
				specificationBuilder.with(x);
			});
		}

		Page<UserDto.authTypeResDto> res = userService.getSocialAndWebauthnUseMember(specificationBuilder.build(),
				req.getPageable());
		return ApiResponse.toOkResponseEntity(res);
	}
}
