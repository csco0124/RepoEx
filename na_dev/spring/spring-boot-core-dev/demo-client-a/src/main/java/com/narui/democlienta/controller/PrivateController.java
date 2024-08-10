package com.narui.democlienta.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PrivateController {
	@GetMapping("/private/view/home")
	public String home() {
		return "authUser/home";
	}
	
	@GetMapping("/private/view/exam1")
	public String exam1() {
		return "authUser/authExam1";
	}
	
	@GetMapping("/private/view/exam2")
	public String exam2() {
		return "authUser/authExam2";
	}
	@GetMapping("/private/view/defaultAuth/user/defaultUser")
	public String defaultUser() {
		return "defaultAuth/user/defaultUser";
	}
	@GetMapping("/private/view/defaultAuth/admin/defaultAdmin")
	public String defaultAdmin() {
		return "defaultAuth/admin/defaultAdmin";
	}
}
