package com.narui.democlienta.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.narui.common.api.ApiResponse;
import com.narui.common.api.ApiResponseEmptyBody;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class AdminController {
	@GetMapping(value = "/admin")
	public String adminPage() {
		return "admin";
	}
//	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> 
}
