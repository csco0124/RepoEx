package com.narui.bauth.domain.authorization.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.narui.bauth.domain.authorization.service.AuthorizationService;
import com.narui.common.api.ApiResponse;
import com.narui.common.api.ApiResponseEmptyBody;

@Controller
public class AuthorizationController {
	private final AuthorizationService authorizationService;
	
	public AuthorizationController(AuthorizationService authorizationService) {
		this.authorizationService = authorizationService;
	}
	
	@PostMapping(value = "/private/api/authorization/delete")
	@ResponseBody
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> deleteAuthorization(String deleteDate){
		authorizationService.deleteAuthorization(deleteDate);
		
		return ApiResponse.toOkResponseEntity();
	}
}
