package com.narui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@ServletComponentScan
@ComponentScan(basePackages = "com.narui")
@SpringBootApplication
public class BauthApplication {

	public static void main(String[] args) {
		SpringApplication.run(BauthApplication.class, args);
	}

}
