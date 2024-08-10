package com.narui.democlienta.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TestController {
//    @RequestMapping("/")
//    public String main() {
//        return "home";
//    }

    @RequestMapping("/home")
    public String home() {
        return "home";
    }

	@GetMapping("/homepage")
	public String homepage() {
		return "homepage";
	}
}
