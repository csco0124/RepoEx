package com.narui.bauth.domain.common.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.narui.bauth.domain.client.entity.ClientEntity;
import com.narui.bauth.domain.client.repository.ClientRepository;
import com.narui.bauth.domain.clientSettingInfo.entity.ClientSettingInfoEntity;
import com.narui.bauth.domain.clientSettingInfo.repository.ClientSettingInfoRepository;
import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.global.mfa.user.MultiFactorUserDetails;
import com.narui.bauth.global.util.PrincipalUtil;
import com.narui.common.api.ApiResponse;
import com.narui.common.api.ApiResponseEmptyBody;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class CommonController {
	private PrincipalUtil principalUtil;
	private ClientSettingInfoRepository clientSettingInfoRepository;
	private ClientRepository clientRepository;
	
	public CommonController(ClientRepository clientRepository, ClientSettingInfoRepository clientSettingInfoRepository, PrincipalUtil principalUtil) {
		this.principalUtil = principalUtil;
		this.clientSettingInfoRepository = clientSettingInfoRepository;
		this.clientRepository = clientRepository;
	}
	
	@Value("${frontend.custom.add.static.file.path}")
	private String envPath;
	
	@GetMapping(value = "/private/api/common/userInfo")
	@ResponseBody
	public ResponseEntity<ApiResponse<UserDto.userInfoForView>> getUserInfo(){
		MultiFactorUserDetails principal = (MultiFactorUserDetails)principalUtil.getPrincipal();
		
		List<String> authorities = principal.getAuthorities().stream().map(authority -> {
			String authorityStr = authority.toString();
			return authorityStr;
		}).collect(Collectors.toList());
		
		UserDto.userInfoForView userInfo= UserDto.userInfoForView.builder()
				.authorities(authorities)
				.email(principal.getEmail())
				.id(principal.getId())
				.kakaoKey(principal.getKakaoKey())
				.naverKey(principal.getNaverKey())
				.googleKey(principal.getGoogleKey())
				.nickname(principal.getNickname())
				.phone(principal.getPhone())
				.using2FA(principal.isUsing2FA())
				.build();
		
		return ApiResponse.toOkResponseEntity(userInfo);
	}
	

	@PostMapping(value = "/private/api/upload-image/{clientId}")
	public ResponseEntity<ApiResponse<ApiResponseEmptyBody>> uploadImage(@PathVariable(value = "clientId") String clientId,
			MultipartHttpServletRequest request) throws IllegalStateException, IOException {
		MultipartFile file = request.getFile("image");
		String basePath = envPath;
		String filePath = basePath + UUID.randomUUID() + file.getOriginalFilename();
		File newFile = new File(filePath);
		if(!newFile.exists()) {
			try {
				newFile.mkdirs();
				log.debug("폴더 생성");
			} catch (Exception e) {
				e.getStackTrace();
			}
		}
		Path destinationFile = Paths.get(filePath);
		Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);
		
		//client_setting_info에 logoUri 정보 업데이트
		ClientEntity clientEntity = clientRepository.findByClientId(clientId).orElse(null);
		ClientSettingInfoEntity entity = clientSettingInfoRepository.findByClientEntity(clientEntity).orElse(null);
		if(entity.getLogoUri() != null) {
			File deleteFile = new File(entity.getLogoUri());
			deleteFile.delete();
		}
		entity.updateLogoUri(filePath);
		clientSettingInfoRepository.save(entity);
		
		return ApiResponse.toOkResponseEntity();
	}
	
	@GetMapping(value = "/public/api/get-image", produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<byte[]> getImage(String imagename) throws Exception {
		InputStream imageStream = new FileInputStream(imagename);
		byte[] imageByteArray = IOUtils.toByteArray(imageStream);
		byte[] encodingImage = Base64.encodeBase64(imageByteArray);
		imageStream.close();
		return new ResponseEntity<byte[]>(encodingImage, HttpStatus.OK);
	}
}
