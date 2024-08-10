package com.narui.bauth.domain.verifySocial.service;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

import org.jboss.aerogear.security.otp.api.Base32;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.narui.bauth.domain.authority.entity.AuthorityEntity;
import com.narui.bauth.domain.authority.repository.AuthorityRepository;
import com.narui.bauth.domain.clientAuthority.entity.ClientAuthorityEntity;
import com.narui.bauth.domain.clientAuthority.repository.ClientAuthorityRepository;
import com.narui.bauth.domain.clientRole.entity.ClientRoleEntity;
import com.narui.bauth.domain.clientRole.repository.ClientRoleRepository;
import com.narui.bauth.domain.mail.service.MailService;
import com.narui.bauth.domain.role.entity.RoleEntity;
import com.narui.bauth.domain.role.repository.RoleRepository;
import com.narui.bauth.domain.socialAuth.service.SocialAuthService;
import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.domain.user.entity.PhoneEntity;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.domain.user.repository.PhoneRepository;
import com.narui.bauth.domain.user.repository.UserRepository;
import com.narui.bauth.domain.verifySocial.dto.VerifySocialDto;
import com.narui.bauth.domain.verifySocial.entity.VerifySocialEntity;
import com.narui.bauth.domain.verifySocial.repository.VerifySocialRepository;
import com.narui.common.api.ApiException;
import com.narui.common.api.ErrorCode;
import com.narui.common.util.DateUtil;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VerifySocialService {
	private final MailService mailService;
	private final SocialAuthService socialAuthService;
	private final PhoneRepository phoneRepository;
	private final UserRepository userRepository;
	private final AuthorityRepository authorityRepository;
	private final VerifySocialRepository verifySocialRepository;	
	private final HttpSession session;
	private final ClientRoleRepository clientRoleRepository;
	private final ClientAuthorityRepository clientAuthorityRepository;
	private final RoleRepository roleRepository;

	private final long authLimitMin = 1; // 인증시도 유효시간 min
	
	private final String CLIENT_ID = "client_id";
	private final String REGIST_WEBAUTHN = "webauthn";
	private final String REGIST_SOCIAL = "social";
	
	public VerifySocialDto getVerifySocial(long id) {
		VerifySocialEntity verifySocialEntity = verifySocialRepository.findById(id).orElse(null);
		VerifySocialDto verifySocialDto = VerifySocialDto.toDto(verifySocialEntity);
		verifySocialDto.setSecretKey(null);
		verifySocialDto.setVerificationCode(null);
		if(!verifySocialDto.isEnabled()) {
			return new VerifySocialDto();
		}
		return verifySocialDto;
	}
	
	/**
	 * 휴대전화 저장하고 SMS발송 
	 */
	@Transactional
	public Long verifyPhoneStep1(final VerifySocialDto verifySocialDto, String registType) 
			throws MessagingException, IOException {
		String secretKey;
		Optional<VerifySocialEntity> existingEntity;
		
		//secretKey unique 처리
		do {
		    secretKey = UUID.randomUUID().toString();
		    existingEntity = verifySocialRepository.findBySecretKey(secretKey);
		} while (existingEntity.isPresent());
		
		if(REGIST_SOCIAL.equals(registType)) {
			Map<?, ?> theHash = (Map<?, ?>)session.getAttribute("socialMap");
			Map<String, String> socialMap = new HashMap<String, String>();
			for( Map.Entry<?, ?> entry : theHash.entrySet()){
				socialMap.put( (String)entry.getKey(), (String)entry.getValue() );
			}
			
			if (socialMap.size() == 0) {
				throw new ApiException(ErrorCode.CREDENTIALEXPIRED);
			}
			
			verifySocialDto.setSocialKey(socialMap.get("socialKey"));
			verifySocialDto.setSocialName(socialMap.get("socialName"));
			verifySocialDto.setEmail(socialMap.get("socialEmail"));
		}
		
		String clientId = null;
		
		//AjaxAuthenticationEntryPoint에서 session에 등록한 client_id가 있는지 확인
		if(!Objects.equals(null, session.getAttribute(CLIENT_ID))) {
			clientId = session.getAttribute(CLIENT_ID).toString();
			session.removeAttribute(CLIENT_ID);
		}
		
		// random 6자리 숫자 발생
		int randCode = ThreadLocalRandom.current().nextInt(100000, 1000000);
		String verificationCode = String.valueOf(randCode);
	
		// SMS로 verificationCode 전송
		mailService.sendSms(verifySocialDto.getPhone(), "인증 번호는 [ " + verificationCode + " ] 입니다.");
	
		Long userId = null;
		PhoneEntity phoneEntity = phoneRepository.findByPhone(verifySocialDto.getPhone());
		if(phoneEntity != null) {
			userId = phoneEntity.getId();
		}
		
		VerifySocialEntity verifySocialEntity = VerifySocialEntity.builder()
													.phone(verifySocialDto.getPhone())
													.verificationCode(verificationCode)
													.socialKey(verifySocialDto.getSocialKey())
													.socialName(verifySocialDto.getSocialName())
													.userId(userId)
													.clientId(clientId)
													.email(verifySocialDto.getEmail())
													.nickname(verifySocialDto.getNickname())
													.lastChallenge(new Timestamp(System.currentTimeMillis()))
													.enabled(true)
													.secretKey(secretKey)
												.build();
		
		verifySocialRepository.save(verifySocialEntity);
		
		
		return verifySocialEntity.getId();
	}
	
	/**
	 * 인증코드 확인후 사용자 계정 활성화
	 */
	@Transactional
	public VerifySocialDto verifyPhoneStep2(final VerifySocialDto verifySocialDto, String registType) {
		VerifySocialEntity verifySocialEntity = verifySocialRepository.findById(verifySocialDto.getId()).orElse(null);
		VerifySocialDto result = verifySocialDto;
		result.setSecretKey(verifySocialEntity.getSecretKey());
		
		if(verifySocialEntity.getUserId() != null) {
			UserEntity user = userRepository.findById(verifySocialEntity.getUserId()).orElse(null);
			verifySocialEntity.updateEmail(user.getEmail());
			verifySocialRepository.save(verifySocialEntity);
			
			//소셜로그인이라면 UserEntity에 socialKey 등록
			if(REGIST_SOCIAL.equals(registType)) {
				//userEntity에 socialKey 추가한 후 save
				user = socialAuthService.updateSocialAuthAndReturn(verifySocialEntity.getSocialName(), verifySocialEntity.getSocialKey(), user);
			}
			
			result  = VerifySocialDto.toDto(verifySocialEntity);
			
			//phone 정보 저장
			PhoneEntity phoneEntity = phoneRepository.findByPhone(result.getPhone());
			phoneEntity.updatePhone(phoneEntity.getPhone(), result.getVerificationCode());
			phoneRepository.save(phoneEntity);
		}
		
		// 인증 유효시간내인지 확인
		if (verifySocialEntity.getLastChallenge() == null
				|| DateUtil.minDiff(verifySocialEntity.getLastChallenge()) > authLimitMin) {      
			throw new ApiException(ErrorCode.CREDENTIALEXPIRED);
		}
		// 코드 확인
		if (!verifySocialEntity.getVerificationCode().equals(verifySocialDto.getVerificationCode())) {
			throw new ApiException(ErrorCode.BADCREDENTIAL);
		}

		if(REGIST_WEBAUTHN.equals(registType)) {
			session.setAttribute("verifyKey", verifySocialEntity.getId());//secretKey로 변경
		}
		
		session.removeAttribute("socialMap");
		return result ;
	}
	
	/**
	   * 사용자 DB 에 추가
	   */
	@Transactional
	public VerifySocialDto insertUser(final UserDto.SignUpSocialReq signUpReq, Long id, String registType) throws Exception {
		VerifySocialEntity verifySocialEntity = verifySocialRepository.findById(id).orElse(null);
		
		if(verifySocialEntity == null) {
			throw new ApiException(ErrorCode.USERNOTFOUND);
		}
		
		String username = signUpReq.getUsername();
		if (username == null) {
			username = signUpReq.getEmail();
		}
	
		UserEntity user = userRepository.findByEmail(signUpReq.getEmail());
	
		if (user != null) {
			throw new ApiException(ErrorCode.USERALREADYEXIST);
		}
		
		verifySocialEntity.updateEmail(signUpReq.getEmail());
		
		// @formatter:off
		user = UserEntity.builder()        
				.email(signUpReq.getEmail())
				.using2FA(false)
				.secret(Base32.random())    //init    
				.nickname(username)
				.accountNonExpired(true)    //init
				.accountNonLocked(true)     //init
				.credentialsNonExpired(true)//init
				.enabled(true)              //init 
				//.phone(phoneEntity)
			.build();
		
		if(REGIST_SOCIAL.equals(registType)) {
			//userEntity에 socialKey 추가한 후 save
			user = socialAuthService.updateSocialAuthAndReturn(verifySocialEntity.getSocialName(), verifySocialEntity.getSocialKey(), user);
		}else {
			userRepository.save(user);
		}
		
		//클라이언트 권한 부여(clientAuthority)
		if(!Objects.equals(null, verifySocialEntity.getClientId())) {
			ClientRoleEntity clientRoleEntity = clientRoleRepository.findByDefaultYnAndClientEntity_ClientId("Y", verifySocialEntity.getClientId());
			if(!Objects.equals(null, clientRoleEntity)) {
				ClientAuthorityEntity entity = ClientAuthorityEntity.builder()
					.userEntity(user)
					.clientRoleEntity(clientRoleEntity)
					.build();
				
				clientAuthorityRepository.save(entity);
			}
		}
		
		// 권한 부여(authority)
		RoleEntity roleEntity = roleRepository.findByDefaultYn("Y").orElse(null);
		AuthorityEntity authorityEntity = AuthorityEntity.builder().user(user).authority(roleEntity.getAuthority()).build();
		
		authorityRepository.save(authorityEntity);
		
		//phone 추가
		PhoneEntity phoneEntity = PhoneEntity.builder()
											.user(user)
											.phone(verifySocialEntity.getPhone())
											.verificationCode(verifySocialEntity.getVerificationCode())
											.lastChallenge(verifySocialEntity.getLastChallenge())
											.verified(true)
										.build();
		phoneRepository.save(phoneEntity);
		
		return VerifySocialDto.builder()
				.userId(user.getId())
				.socialName(verifySocialEntity.getSocialName())
			.build();
	}
}
