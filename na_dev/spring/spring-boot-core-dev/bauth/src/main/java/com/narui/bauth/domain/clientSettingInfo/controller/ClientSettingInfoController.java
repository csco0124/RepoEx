package com.narui.bauth.domain.clientSettingInfo.controller;

import java.io.IOException;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import com.narui.common.api.ApiResponse;
import com.narui.bauth.domain.clientSettingInfo.dto.ClientSettingInfoDto;
import com.narui.bauth.domain.clientSettingInfo.service.ClientSettingInfoService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class ClientSettingInfoController {
	
	@Autowired
	private ClientSettingInfoService clientSettingInfoService;
	
	@Operation(description = "identifier 페이지 대신 클라이언트의 초기화면으로 redirect url 제공")
	@GetMapping(value = "/public/api/client/redirect")
	public ResponseEntity<ApiResponse<String>> redirectClient(String clientId, HttpServletResponse response) throws IOException{
		ClientSettingInfoDto clientSettingInfoDto = clientSettingInfoService.getClientsettingInfo(clientId);
		
		if(Objects.equals(null, clientSettingInfoDto)) {
			return null;
		}
		if(Objects.equals(null, clientSettingInfoDto.getHomeUri())) {
			return null;
		}
		
		String redirect = clientSettingInfoDto.getBaseUrl() + clientSettingInfoDto.getHomeUri();
		
		return ApiResponse.toOkResponseEntity(redirect);
	}
	
	@Operation(description = "homeUri 및 baseUrl 가져오기")
	@GetMapping(value = "/public/api/client/redirect-info")
	public ResponseEntity<ApiResponse<ClientSettingInfoDto>> getRedirectInfo(String clientId){
		ClientSettingInfoDto clientSettingInfoDto = clientSettingInfoService.getClientsettingInfo(clientId);
		
		if(Objects.equals(null, clientSettingInfoDto)) {
			return ApiResponse.toOkResponseEntity(null);
		}
		
		ClientSettingInfoDto result = ClientSettingInfoDto.builder()
				.baseUrl(clientSettingInfoDto.getBaseUrl())
				.homeUri(clientSettingInfoDto.getHomeUri())
				.logoUri(clientSettingInfoDto.getLogoUri())
				.build();
		
		return ApiResponse.toOkResponseEntity(result);
	}
	
	@Operation(description = "clientSettingInfo 테이블의 정보를 가져오기")
	@GetMapping(value = "/private/api/client/{id}")
	@ResponseBody
	public ResponseEntity<ApiResponse<ClientSettingInfoDto>> getClientsettingInfo(@PathVariable(value = "id") String clientId){
		ClientSettingInfoDto clientSettingInfoDto = clientSettingInfoService.getClientsettingInfo(clientId);
		return ApiResponse.toOkResponseEntity(clientSettingInfoDto);
	}
	
}
