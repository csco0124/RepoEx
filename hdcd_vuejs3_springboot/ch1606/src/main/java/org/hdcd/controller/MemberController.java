package org.hdcd.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MemberController {

	@PostMapping(path = "/upload", produces = "text/plain;charset=UTF-8")
	public ResponseEntity<String> upload(MultipartFile file) throws Exception {
		String originalFilename = file.getOriginalFilename();
		
		log.info("originalName: " + originalFilename);

		ResponseEntity<String> entity = new ResponseEntity<String>("UPLOAD SUCCESS " + originalFilename, HttpStatus.OK);

		return entity;
	}

}
