package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class SpriongDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpriongDemoApplication.class, args);
	}
	
	@GetMapping(value = "/")
	public String helloWorld() {
		return "Hello World";
	}

}
