package com.narui.bauth.domain.client.controller;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.narui.bauth.domain.client.dto.ClientDto;
import com.narui.bauth.domain.client.dto.RegisteredClientDto;
import com.narui.bauth.domain.client.dto.RegisteredClientSettingDto;
import com.narui.bauth.domain.client.service.OAuth2RegisteredClientService;
import com.narui.bauth.domain.client.specification.ClientSpecificationBuilder;
import com.narui.bauth.domain.clientSettingInfo.dto.ClientSettingInfoDto;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.common.api.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/private")
public class OAuth2RegisteredClientController {

	private final OAuth2RegisteredClientService oAuth2RegisteredClientService;

	private final PasswordEncoder passwordEncoder;

	public OAuth2RegisteredClientController(
			OAuth2RegisteredClientService oAuth2RegisteredClientService,
			PasswordEncoder passwordEncoder)
	{
		this.oAuth2RegisteredClientService = oAuth2RegisteredClientService;
		this.passwordEncoder = passwordEncoder;
	}

	@GetMapping("/view/registered-client")
	public String index(Principal principal, Model model) {

		log.debug("username = [ {} ]", principal.getName());
		List<RegisteredClient> clients = oAuth2RegisteredClientService.findByOwner(principal.getName());
		model.addAttribute("clients", clients);

		return "auth/registeredClient/index";
	}

	@Operation(summary = "OAuth2 Client Owner 목록 조회")
	@GetMapping("/api/registered-client/list-owner")
	public ResponseEntity<ApiResponse<List<RegisteredClient>>> listByOwner(Principal principal){
		List<RegisteredClient> clients = oAuth2RegisteredClientService.findByOwner(principal.getName());
		return ApiResponse.toOkResponseEntity(clients);
	}

	@Operation(summary = " 검색기능 이용시 OAuth2 Client 전체 목록 조회")
	@ResponseBody
	@PostMapping("/api/registered-client/listsPageSearch")
	public ResponseEntity<ApiResponse<Page<RegisteredClientDto.SearchRes>>> listsPageSearch(
			@Validated @RequestBody RegisteredClientDto.Search req) throws Exception {

		//spec builder -> clientSpecification
		ClientSpecificationBuilder specificationBuilder = new ClientSpecificationBuilder();
	    List<SearchCriteria> criteriaList = req.getSearchCriteriaList();

	    if (criteriaList != null) {
	      criteriaList.forEach(x -> {
	        x.setDataOption(req.getDataOption());
	        specificationBuilder.with(x);
	      });
	    }

	    Page<RegisteredClientDto.SearchRes> res = oAuth2RegisteredClientService.findAllSearch(specificationBuilder.build(), req.getPageable());
	    return ApiResponse.toOkResponseEntity(res);

	}

	@Operation(summary = "OAuth2 Client 조회",
			parameters = {
					@Parameter(name = "id", description = "클라이언트 ID")
			})
	@GetMapping("/api/registered-client/list/{id}")
	public ResponseEntity<ApiResponse<RegisteredClientDto>> details(@PathVariable("id") String registeredClientId) {
		if (!registeredClientId.isEmpty()) {
			RegisteredClient registeredClient = oAuth2RegisteredClientService.findById(registeredClientId);
			if (registeredClient != null) {
				return ApiResponse.toOkResponseEntity(RegisteredClientDto.toDto(registeredClient));
			}
		}
		return ApiResponse.toOkResponseEntity(RegisteredClientDto.builder().build());
	}

	@Operation(summary = "OAuth2 Client 삭제",
			parameters = {
					@Parameter(name = "id", description = "클라이언트 ID")
			})
	@DeleteMapping("/api/registered-client/delete/{id}")
	public ResponseEntity<Boolean> delete(@PathVariable String id) {
		try {
			oAuth2RegisteredClientService.deleteById(id);
			return ResponseEntity.ok(true);
		} catch (Exception e) {
			return ResponseEntity.internalServerError().body(false);
		}
	}

	@GetMapping("/view/registered-client/save")
	public String save() {
		return "auth/registeredClient/register";
	}

//	@Operation(summary = "OAuth2 Client 등록/수정")
//	@PostMapping("/api/registered-client/save")
//	public ResponseEntity<ApiResponse<RegisteredClientDto>> save(@RequestBody RegisteredClientDto dto) {
//		/*
//		* 신규 등록시 clientId 와 clientSecret 을 생성
//		* */
//		if (dto.getClientId() == null || dto.getClientId().isEmpty()) {
//			dto.setClientId(UUID.randomUUID() + ".naruint.com");;
//		}
//
//		String clientSecret = "";
//		if (dto.getClientSecret() == null || dto.getClientSecret().isEmpty()) {
//			clientSecret = UUID.randomUUID().toString();
//			dto.setClientSecret(passwordEncoder.encode(clientSecret));
//		}
//
//		try {
//			oAuth2RegisteredClientService.save(dto.toRegisteredClient());
//		} catch (Exception e) {
//			throw new RuntimeException("서버에서 오류가 발생했습니다.");
//		}
//
//		if (!clientSecret.isEmpty()) {
//			dto.setClientSecret(clientSecret);
//		}
//
//		return ApiResponse.toOkResponseEntity(dto);
//	}

	//기존 클라이언트 등록 파라미터에서 clientsettinginfoDto를 추가로 받아서 사용하기 위한 메서드
	@Operation(summary = "OAuth2 Client 등록/수정")
	@PostMapping("/api/registered-client/save")
	public ResponseEntity<ApiResponse<RegisteredClientDto>> save(@RequestBody RegisteredClientSettingDto dto1) {

		RegisteredClientDto dto = dto1.getRegisteredClientDto();
		ClientSettingInfoDto clientSettingInfoDto = dto1.getClientSettingInfoDto();
		/*
		 * 신규 등록시 clientId 와 clientSecret 을 생성
		 * */
		if (dto.getClientId() == null || dto.getClientId().isEmpty()) {
			dto.setClientId(UUID.randomUUID() + ".naruint.com");;
		}

		String clientSecret = "";
		if (dto.getClientSecret() == null || dto.getClientSecret().isEmpty()) {
			clientSecret = UUID.randomUUID().toString();
			dto.setClientSecret(passwordEncoder.encode(clientSecret));
		}

		try {
			//oAuth2RegisteredClientService.save(dto.toRegisteredClient());
			oAuth2RegisteredClientService.registeredClientSettingSave(dto.toRegisteredClient(), clientSettingInfoDto);
		} catch (Exception e) {
			throw new RuntimeException("서버에서 오류가 발생했습니다.");
		}

		if (!clientSecret.isEmpty()) {
			dto.setClientSecret(clientSecret);
		}

		return ApiResponse.toOkResponseEntity(dto);
	}

	@GetMapping("/api/registered-client/all-list")
	public ResponseEntity<ApiResponse<List<ClientDto.ClientName>>> findAllClinet(){
		return ApiResponse.toOkResponseEntity(oAuth2RegisteredClientService.findAllClinet());
	}
}
