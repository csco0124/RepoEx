package com.narui.bauth.domain.user.service;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Objects;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.Function;

import org.jboss.aerogear.security.otp.api.Base32;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.narui.bauth.domain.authority.entity.AuthorityEntity;
import com.narui.bauth.domain.authority.repository.AuthorityRepository;
import com.narui.bauth.domain.clientAuthority.entity.ClientAuthorityEntity;
import com.narui.bauth.domain.clientAuthority.repository.ClientAuthorityRepository;
import com.narui.bauth.domain.clientRole.entity.ClientRoleEntity;
import com.narui.bauth.domain.clientRole.repository.ClientRoleRepository;
import com.narui.bauth.domain.mail.dto.MailDto;
import com.narui.bauth.domain.mail.service.MailService;
import com.narui.bauth.domain.role.entity.RoleEntity;
import com.narui.bauth.domain.role.repository.RoleRepository;
import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.domain.user.entity.PhoneEntity;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.domain.user.mapstruct.UserMsMapper;
import com.narui.bauth.domain.user.repository.PhoneRepository;
import com.narui.bauth.domain.user.repository.UserRepository;
import com.narui.common.api.ApiException;
import com.narui.common.api.ErrorCode;
import com.narui.common.util.DateUtil;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class UserService {

	// TODO property 변수로 변경
	private final long authLimitMin = 1; // 인증시도 유효시간 min

	private final MailService mailService;

	private final UserRepository userRepository;
	private final AuthorityRepository authorityRepository;
	private final PhoneRepository phoneRepository;
	private final ClientRoleRepository clientRoleRepository;
	private final ClientAuthorityRepository clientAuthorityRepository;
	private final RoleRepository roleRepository;

	private final HttpSession session;

	PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	private static final String CLIENT_ID = "client_id";
	private static final String DefaultYnValueY = "Y";

	/**
	 * 계정조회
	 */
	public UserDto.AccountLookupRes accountlookup(final UserDto.AccountLookupReq accountLookupReq) throws Exception {
		UserEntity user = userRepository.findByEmail(accountLookupReq.getEmail());

		if (user == null) {
			throw new ApiException(ErrorCode.USERNOTFOUND);
		}
		UserDto.AccountLookupRes accountLookupRes = UserMsMapper.INSTANCE.toDto(user);
		return accountLookupRes;
	}

	/**
	 * 사용자 DB 에 추가
	 */
	public void insertUser(final UserDto.SignUpReq signUpReq) throws Exception {

		String username = signUpReq.getUsername();
		if (username == null) {
			username = signUpReq.getEmail();
		}

		UserEntity user = userRepository.findByEmail(signUpReq.getEmail());

		if (user != null) {
			/* 사용자는 존재하지만 휴대폰인증은 하지 않은경우 이어하기 제공 */
			phoneRepository.findById(user.getId()).orElseThrow(() -> new ApiException(ErrorCode.PHONEUNAUTHORIZED));

			throw new ApiException(ErrorCode.USERALREADYEXIST);
			// throw new ApiException("이미 등록된 사용자 라는 에러문장을 그대로 전달하고 싶을때");
		}

		// 비밀번호 암호화
		String password = passwordEncoder.encode(signUpReq.getPassword());

	// @formatter:off
    user = UserEntity.builder()        
        .email(signUpReq.getEmail())
        .using2FA(signUpReq.isUsing2FA())
        .secret(Base32.random())    //init    
        .nickname(username)
        .password(password)                
        .accountNonExpired(true)    //init
        .accountNonLocked(true)     //init
        .credentialsNonExpired(true)//init
        .enabled(false)              //init  사용자 확인후 true 처리
        //.phone(phoneEntity)
        .build();
    // @formatter:on

		userRepository.save(user);
	}

	/**
	 * 휴대전화 저장하고 SMS발송
	 */
	public void verifyPhoneStep1(final UserDto.VerifyPhoneReq verifyPhoneReq) throws MessagingException, IOException {
		PhoneEntity phoneCheck = phoneRepository.findByPhone(verifyPhoneReq.getPhone());
		// 이미 등록된 전화번호가 있을 경우
		if (!Objects.equals(null, phoneCheck)) {
			throw new ApiException(ErrorCode.USERALREADYEXIST);
		}
		// random 6자리 숫자 발생
		int randCode = ThreadLocalRandom.current().nextInt(100000, 1000000);
		String verificationCode = String.valueOf(randCode);

		log.debug("verificationCode: {}", verificationCode);

		// Email로 verificationCode 전송
	// @formatter:off
    MailDto mailDto = MailDto.builder()
        .to(verifyPhoneReq.getEmail())
        .subject("Verification Code")
        .useHtml(false)
        .content("인증 번호는 [ " + verificationCode + " ] 입니다.")
        .build();
    // @formatter:on
		mailService.sendMail(mailDto);

		// SMS로 verificationCode 전송
		mailService.sendSms(verifyPhoneReq.getPhone(), "인증 번호는 [ " + verificationCode + " ] 입니다.");

		UserEntity user = userRepository.findWithPhoneByEmail(verifyPhoneReq.getEmail());
		PhoneEntity phoneEntity = user.getPhone();

		if (phoneEntity != null) {
			// 전화번호 변경입력
			phoneEntity.updatePhone(verifyPhoneReq.getPhone(), verificationCode);
		} else {
			// 전화번호 신규입력
			phoneEntity = PhoneEntity.builder().user(user).phone(verifyPhoneReq.getPhone())
					.verificationCode(verificationCode).verified(false)
					.lastChallenge(new Timestamp(System.currentTimeMillis())).build();
		}
		phoneRepository.save(phoneEntity);
	}

	/**
	 * 인증코드 확인후 사용자 계정 활성화
	 */
	public void verifyPhoneStep2(final UserDto.VerifyCodeReq verifyCodeReq) {

		UserEntity user = userRepository.findWithPhoneByEmail(verifyCodeReq.getEmail());
		PhoneEntity phoneEntity = user.getPhone();

		// 인증 유효시간내인지 확인
		if (phoneEntity.getLastChallenge() == null || DateUtil.minDiff(phoneEntity.getLastChallenge()) > authLimitMin) {
			throw new ApiException(ErrorCode.CREDENTIALEXPIRED);
		}
		// 코드 확인
		if (!phoneEntity.getVerificationCode().equals(verifyCodeReq.getVerificationCode())) {
			throw new ApiException(ErrorCode.BADCREDENTIAL);
		}
		// 확인완료 상태로 변경
		phoneEntity.updateVerified(true);

		String clientId = null;

		// AjaxAuthenticationEntryPoint에서 session에 등록한 client_id가 있는지 확인
		if (!Objects.equals(null, session.getAttribute(CLIENT_ID))) {
			clientId = session.getAttribute(CLIENT_ID).toString();
			session.removeAttribute(CLIENT_ID);
		}

		// 클라이언트 권한 부여(clientAuthority)
		if (!Objects.equals(null, clientId)) {
			ClientRoleEntity clientRoleEntity = clientRoleRepository
					.findByDefaultYnAndClientEntity_ClientId(DefaultYnValueY, clientId);
			if (!Objects.equals(null, clientRoleEntity)) {
				ClientAuthorityEntity clientAuthorityEntity = ClientAuthorityEntity.builder().userEntity(user)
						.clientRoleEntity(clientRoleEntity).build();

				clientAuthorityRepository.save(clientAuthorityEntity);
			}
		}
		
		// 권한 부여
		RoleEntity roleEntity = roleRepository.findByDefaultYn("Y").orElse(null);
		AuthorityEntity authorityEntity = AuthorityEntity.builder().user(user).authority(roleEntity.getAuthority()).build();

		authorityRepository.save(authorityEntity);

		// 사용자 계정 활성화
		user.updateEnabled(true);
	}

	/**
	 * 사용자 계정 잠금
	 */
	public void lockAccount(UserEntity userEntity) {
		userEntity.updateAccountNonLocked(false);
		userRepository.save(userEntity);
	}

	/**
	 * 사용자 계정 해제
	 */
	public void unlockAccount(UserEntity userEntity) {
		userEntity.updateAccountNonLocked(true);
		userRepository.save(userEntity);
	}

	/**
	 * 사용자 비밀번호 변경
	 */
	public void savePassword(UserEntity userEntity) {

		// 비밀번호 암호화
		String password = userEntity.getPassword();
		userEntity.updatePassword(passwordEncoder.encode(password));
		userRepository.save(userEntity);
	}

	/**
	 * 이중인증허용 상태로 변경
	 */
	public void allowUsing2fa(UserEntity userEntity) {
		userEntity.updateUsing2FA(true);
		userRepository.save(userEntity);
	}

	// userPage 사용자 조회
	public Page<UserDto.UserPageData> findAllByEnabledTrue(Specification<UserEntity> spec,
			Pageable pageable) {
		Page<UserEntity> entityData = userRepository.findAll(spec, pageable);
		Page<UserDto.UserPageData> res = entityData.map(new Function<UserEntity, UserDto.UserPageData>() {
			@Override
			public UserDto.UserPageData apply(UserEntity loginLog) {
				return UserMsMapper.INSTANCE.toUserDto(loginLog);
			}
		});
		return res;
	}

	/**
	 * 소셜/생체인증 사용자 조회
	 */
	public Page<UserDto.authTypeResDto> getSocialAndWebauthnUseMember(Specification<UserEntity> spec,
			Pageable pageable) {
		Page<UserEntity> authTypeRes = userRepository.findAll(spec, pageable);
		Page<UserDto.authTypeResDto> res = authTypeRes.map(new Function<UserEntity, UserDto.authTypeResDto>() {
			@Override
			public UserDto.authTypeResDto apply(UserEntity loginLog) {
				return UserMsMapper.INSTANCE.toAuthTypeUserDto(loginLog);
			}
		});
		return res;
	}
}
