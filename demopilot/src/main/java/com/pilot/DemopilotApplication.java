package com.pilot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class DemopilotApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemopilotApplication.class, args);
	}

}
