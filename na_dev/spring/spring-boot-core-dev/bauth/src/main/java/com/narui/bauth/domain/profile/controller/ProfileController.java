package com.narui.bauth.domain.profile.controller;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.narui.bauth.domain.profile.service.ProfileService;
import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.domain.user.repository.UserRepository;
import com.narui.bauth.domain.verifySocial.repository.VerifySocialRepository;
import com.narui.bauth.domain.webauthn.dto.AuthenticatorForm;
import com.narui.bauth.global.mfa.user.MultiFactorUserDetails;
import com.narui.bauth.global.util.PrincipalUtil;
import com.narui.bauth.global.webauthn.util.AuthenticatorSpecificMapper;
import com.narui.common.api.ApiResponse;
import com.webauthn4j.springframework.security.WebAuthnRegistrationRequestValidator;
import com.webauthn4j.util.Base64UrlUtil;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;

@Controller
public class ProfileController {

    private final UserRepository userRepository;

    private final ProfileService profileService;

    private final AuthenticatorSpecificMapper specificMapper;
    
    private final PrincipalUtil principalUtil;
    
    public ProfileController(
            UserRepository userRepository,
            ProfileService profileService,
            AuthenticatorSpecificMapper specificMapper,
            WebAuthnRegistrationRequestValidator registrationRequestValidator,
            PrincipalUtil principalUtil,
            VerifySocialRepository verifySocialRepository
    ) {
        this.userRepository = userRepository;
        this.profileService = profileService;
        this.specificMapper = specificMapper;
        this.principalUtil = principalUtil;
    }

    @GetMapping("/profile")
    public String index() {
        return "user/profile";
    }

    @GetMapping("/public/api/profile")
    public ResponseEntity<ApiResponse<UserDto.ProfileForm>> show() {
    	MultiFactorUserDetails user = (MultiFactorUserDetails)principalUtil.getPrincipal();
        UserEntity userEntity = userRepository.findWithAuthenticatorsByEmail(user.getEmail());
        Set<AuthenticatorForm> authenticatorForms
                = specificMapper.mapToAuthenticatorFormList(userEntity.getAuthenticators());

        return ApiResponse.toOkResponseEntity(
                UserDto.ProfileForm.builder()
                        .userHandle(Base64UrlUtil.encodeToString(user.getEmail().getBytes()))
                        .email(userEntity.getEmail())
                        .username(userEntity.getNickname())
                        .authenticators(authenticatorForms)
                        .build()
        );
    }

    @PostMapping("/public/api/profile")
    @ResponseBody
    public ResponseEntity<ApiResponse<UserDto.ProfileForm>> authUserSave(HttpServletRequest request, @RequestBody UserDto.ProfileForm profileForm) {
    	MultiFactorUserDetails user = (MultiFactorUserDetails)principalUtil.getPrincipal();
    	UserDto.ProfileForm res = profileService.webauthnSave(request, profileForm, user); 
    	return ApiResponse.toOkResponseEntity(res);
    }

    @Operation(description = "로그인 페이지에서 webauthn을 등록할 경우(로그인 되지 않은 상태)")
    @PostMapping("/public/api/profile/{verifySocialId}")
    @ResponseBody
    public ResponseEntity<ApiResponse<UserDto.ProfileForm>> annonymousUserSave(HttpServletRequest request, @RequestBody UserDto.WebauthnProfileForm profileForm, 
    		@PathVariable(value = "verifySocialId") Long verifySocialId) {
		UserDto.ProfileForm res = profileService.annonymousUserSave(request, profileForm, verifySocialId);
    	return ApiResponse.toOkResponseEntity(res);
    }
    
}
