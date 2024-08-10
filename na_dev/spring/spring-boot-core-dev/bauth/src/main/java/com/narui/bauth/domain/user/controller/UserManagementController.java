package com.narui.bauth.domain.user.controller;

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
import com.narui.bauth.domain.user.specification.UserSpecificationBuilder;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.common.api.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/private/api/admin/user-management")
public class UserManagementController {

	
	private final UserService userService;
	
	
	public UserManagementController(UserService userService) {
		this.userService = userService;
	}
	@Operation(summary = "사용자페이지 리스트 출력")
	@PostMapping
	public ResponseEntity<ApiResponse<Page<UserDto.UserPageData>>> findAllByEnabledTrue(
			@Validated @RequestBody UserDto.authTypeReqDto req) {
		UserSpecificationBuilder specificationBuilder = new UserSpecificationBuilder();
		List<SearchCriteria> criteriaList = req.getSearchCriteriaList();
		if (criteriaList != null) {
			criteriaList.forEach(x -> {
				x.setDataOption(req.getDataOption());
				specificationBuilder.with(x);
			});
		}
		Page<UserDto.UserPageData> res = userService.findAllByEnabledTrue(specificationBuilder.build(),
				req.getPageable());
		return ApiResponse.toOkResponseEntity(res);
	}
}









