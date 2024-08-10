package com.narui.bauth.domain.config.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.narui.bauth.domain.config.dto.ConfigDto;
import com.narui.bauth.domain.config.service.ConfigService;
import com.narui.common.api.ApiResponse;
import com.narui.common.api.ApiResponseEmptyBody;

import io.swagger.v3.oas.annotations.Operation;

@RequestMapping("/private/api/admin")
@RestController
public class ConfigController {
	
	private ConfigService configService;
	
	public ConfigController(ConfigService configService) {
		this.configService = configService;
	}
	
	@Operation(summary = "config 테이블 전체조회")
	@GetMapping("/config")
	public ResponseEntity<ApiResponse<List<ConfigDto.ConfigResDto>>> findConfigAll() {
		// config은 페이징 사용안함
		List<ConfigDto.ConfigResDto> configDtoList = configService.findConfigAll();
		return ApiResponse.toOkResponseEntity(configDtoList);
	}
	
	@Operation(summary = "config 테이블 pk로 조회")
	@GetMapping("/config/{configKey}")
	public ResponseEntity<ApiResponse<ConfigDto.ConfigResDto>> findConfigById(@PathVariable(value = "configKey") String configKey) {
		ConfigDto.ConfigResDto configDto = configService.findConfigById(configKey);
		return ApiResponse.toOkResponseEntity(configDto);
	}
	
	@Operation(summary = "config 테이블 행 추가")
	@PostMapping("/config")
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> saveConfig(@RequestBody ConfigDto.ConfigReqDto configReqDto) {
		configService.saveConfig(configReqDto);
		return ApiResponse.toOkResponseEntity();
	}
	
	@Operation(summary = "config 테이블 컬럼 수정")
	@PatchMapping("/config")
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> updateConfig(@RequestBody ConfigDto.ConfigReqDto configReqDto) {
		configService.updateConfig(configReqDto);
		return ApiResponse.toOkResponseEntity();
	}
	
	@Operation(summary = "config 테이블 pk로 행 삭제")
	@DeleteMapping("/config/{configKey}")
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> deleteConfig(@PathVariable(value = "configKey") String configKey) {
		configService.deleteConfig(configKey);
		return ApiResponse.toOkResponseEntity();
	}
	
}
