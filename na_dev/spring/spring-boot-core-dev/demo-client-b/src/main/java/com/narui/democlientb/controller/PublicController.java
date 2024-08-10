package com.narui.democlientb.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.narui.common.api.ApiResponse;

@Controller
public class PublicController {
	@Value("${client-authority}")
	private String clientAuthority;
	
	@Value("${server.type}")
	private String serverType;
	
//	@GetMapping("/")
//	public String main() {
//		return "homepage";
//	}
	
	@GetMapping("/public/view/home")
	public String home() {
		return "guestUser/home";
	}
	
	@GetMapping("/public/view/exam1")
	public String exam1() {
		return "guestUser/guestExam1";
	}
	
	@GetMapping("/public/view/exam2")
	public String exam2() {
		return "guestUser/guestExam2";
	}

	@GetMapping("/public/api/client-authority")
	@ResponseBody
	public ResponseEntity<ApiResponse<String>> getClientAuthority() {
		String result = "ROLE_" + clientAuthority;
		return ApiResponse.toOkResponseEntity(result);
	}
	
}
