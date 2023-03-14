package org.hdcd.common.controller;

import java.util.List;

import org.hdcd.dto.CodeLabelValue;
import org.hdcd.service.CodeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/codes")
public class CodeController {
	
	private final CodeService codeService;
	
	@GetMapping("/codeGroup")
	public ResponseEntity<List<CodeLabelValue>> codeGroupList() throws Exception {
		log.info("codeGroupList");
		
		return new ResponseEntity<>(codeService.getCodeGroupList(), HttpStatus.OK);
	}
	
}
