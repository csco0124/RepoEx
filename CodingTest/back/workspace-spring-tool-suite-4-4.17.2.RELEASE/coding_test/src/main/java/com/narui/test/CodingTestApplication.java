package com.narui.test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.narui.test.repository.MemberRepository;

@SpringBootApplication
public class CodingTestApplication implements CommandLineRunner {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    MemberRepository repository;

    public static void main(String[] args) {
        SpringApplication.run(CodingTestApplication.class, args);
    }

    @Override
    public void run(String... args) {
        logger.info("All users -> {}", repository.findAll());
    }
}