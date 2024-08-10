package com.narui.bauth.domain.loginLog.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.narui.bauth.domain.loginLog.dto.LoginLogDto;
import com.narui.bauth.domain.loginLog.service.OAuth2LoginLogService;
import com.narui.bauth.domain.loginLog.specification.LoginLogSpecificationBuilder;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.common.api.ApiResponse;
import com.narui.common.api.ParamException;
import io.swagger.v3.oas.annotations.Operation;

@RestController
public class LoginLogController {

	@Autowired
	private OAuth2LoginLogService oAuth2LoginLogService;

	/*@Operation(summary = "로그인 로그 검색(변경전)")
	@PostMapping("/private/api/loginLog/selectLoginLogList")
	public Map<String, Object> selectLoginLogList(@RequestBody LoginLogDto dto, Model model) throws Exception {
		return oAuth2LoginLogService.selectLoginLogObject(dto);
	}*/
	
	@Operation(summary = "로그인 로그 검색 리스트")
	@PostMapping(path = "/private/api/loginLog/getLoginLogList")
	public ResponseEntity<ApiResponse<Page<LoginLogDto.SearchRes>>> getLoginLogList(@Validated @RequestBody LoginLogDto.Search req, Errors errors) {
		
		if (errors.hasErrors()) {
			throw new ParamException(errors);
		}

		// 검색조건 세팅
		LoginLogSpecificationBuilder specificationBuilder = new LoginLogSpecificationBuilder();
		List<SearchCriteria> criteriaList = req.getSearchCriteriaList();
		if (criteriaList != null) {
			criteriaList.forEach(x -> {
				x.setDataOption(req.getDataOption());
				specificationBuilder.with(x);
			});
		}

		Page<LoginLogDto.SearchRes> res = oAuth2LoginLogService.searchLoginLogs(specificationBuilder.build(),req.getPageable());
		return ApiResponse.toOkResponseEntity(res);
	}
	
	@Operation(summary = "로그인 로그 검색(예제)")
	@PostMapping(path = "/private/api/loginLog/searchLoginLog", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse<Page<LoginLogDto.SearchRes>>> searchLoginLog(@Validated @RequestBody LoginLogDto.Search req, Errors errors) {
		if (errors.hasErrors()) {
			throw new ParamException(errors);
		}

		// 검색조건 세팅
		LoginLogSpecificationBuilder specificationBuilder = new LoginLogSpecificationBuilder();
		List<SearchCriteria> criteriaList = req.getSearchCriteriaList();
		if (criteriaList != null) {
			criteriaList.forEach(x -> {
				x.setDataOption(req.getDataOption());
				specificationBuilder.with(x);
			});
		}

		Page<LoginLogDto.SearchRes> res = oAuth2LoginLogService.searchLoginLogs(specificationBuilder.build(),req.getPageable());
		return ApiResponse.toOkResponseEntity(res);
	}
	
	@Operation(summary = "로그인 로그 통계 데이터")
	@PostMapping(path = "/private/api/loginLog/getLoginLogCountList")
	public Map<String, Object> getLoginLogCountList(@RequestBody LoginLogDto dto, Model model) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		resultMap.put("loginAnalyticsData", oAuth2LoginLogService.selectLoginLogCountList(dto.getStartDate(), dto.getEndDate()));
		
		return resultMap;
	}
}
