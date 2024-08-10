package com.narui.democlientb.test.controller;


import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.HandlerMapping;

import com.narui.democlientb.test.dto.MbyGridDto;
import com.narui.democlientb.test.service.MbyGridService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/api/mby/mocha")
public class MbyMochaController {

	private final MbyGridService mbyService;

	public MbyMochaController(MbyGridService mbyService) {
		this.mbyService = mbyService;
	}

	// 입력 키워드에 맞는 json데이터 불러오기(API-MOCHA)
	@GetMapping("/**")
	@ResponseBody
	public MbyGridDto getJsonData(HttpServletRequest request) throws Exception {
		String getPath = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
		String data = getPath.substring("/api/mby/mocha".length());
		return mbyService.getJsonData(data);
	}

}
