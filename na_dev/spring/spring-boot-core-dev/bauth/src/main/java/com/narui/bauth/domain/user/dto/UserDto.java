package com.narui.bauth.domain.user.dto;

import java.util.List;
import java.util.Set;

import com.narui.bauth.domain.authority.dto.AuthorityDto;
import com.narui.bauth.domain.webauthn.dto.AuthenticatorForm;
import com.narui.bauth.global.search.dto.PageableDto;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.common.vali.ValidEmail;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

public class UserDto {

	/**
	 * 계정조회
	 */
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class AccountLookupReq {

		@Schema(description = "이메일")
		@ValidEmail(message = "{InvalidEmail}")
		@NotNull
		private String email;
	}

	@Builder
	@Getter
	@Setter
	@AllArgsConstructor
	public static class AccountLookupRes {

		@Schema(description = "이메일")
		private String email;

		@Schema(description = "2FA 인증 사용여부")
		private boolean using2FA;

		@Schema(description = "사용자 이름")
		private String username;
	}

	/**
	 * 계정생성
	 */
	@Getter
	@Setter
	@AllArgsConstructor
	public static class SignUpReq {

		@Schema(description = "이메일")
		@ValidEmail(message = "{InvalidEmail}")
		@NotNull
		private String email;

		@Schema(description = "2FA 인증 사용여부")
		private boolean using2FA;

		@Schema(description = "사용자 이름")
		@NotEmpty(message = "{NotEmpty}")
		@Size(max = 50)
		private String username;

		@Schema(description = "비밀번호")
		@NotEmpty(message = "{NotEmpty}")
		private String password;
	}

	/**
	 * 계정생성
	 */
	@Getter
	@Setter
	@AllArgsConstructor
	public static class SignUpSocialReq {

		@Schema(description = "이메일")
		@ValidEmail(message = "{InvalidEmail}")
		@NotNull
		private String email;

		@Schema(description = "2FA 인증 사용여부")
		private boolean using2FA;

		@Schema(description = "사용자 이름")
		@NotEmpty(message = "{NotEmpty}")
		@Size(max = 50)
		private String username;
	}

	/**
	 * 휴대폰 인증 step 1/2
	 */
	@Getter
	@Setter
	@AllArgsConstructor
	public static class VerifyPhoneReq {

		@Schema(description = "이메일")
		@NotEmpty(message = "{NotEmpty}")
		private String email;

		@Schema(description = "휴대폰번호")
		@NotEmpty(message = "{NotEmpty}")
		@Size(max = 20)
		private String phone;
	}

	/**
	 * 휴대폰 인증 step 2/2
	 */
	@Getter
	@Setter
	@AllArgsConstructor
	public static class VerifyCodeReq {

		@Schema(description = "이메일")
		@NotEmpty(message = "{NotEmpty}")
		private String email;

		@Schema(description = "인증코드")
		@NotEmpty(message = "{NotEmpty}")
		private String verificationCode;
	}

	@Getter
	@Setter
	@ToString
	public static class ProfileForm {

		private String userHandle;
		private String email;
		private String username;
		private Set<AuthenticatorForm> authenticators;

		@Builder
		public ProfileForm(String userHandle, String email, String username, Set<AuthenticatorForm> authenticators) {
			this.userHandle = userHandle;
			this.email = email;
			this.username = username;
			this.authenticators = authenticators;
		}
	}
	
	@Getter
	@Setter
	@ToString
	public static class WebauthnProfileForm {
		
		private String userHandle;
		private String email;
		private String username;
		private Set<AuthenticatorForm> authenticators;
		private String secretKey;
		
		@Builder
		public WebauthnProfileForm(String userHandle, String email, String username, Set<AuthenticatorForm> authenticators, String secretKey) {
			this.userHandle = userHandle;
			this.email = email;
			this.username = username;
			this.authenticators = authenticators;
			this.secretKey = secretKey;
		}
	}

	@Getter
	@Setter
	@Builder
	public static class ResetPasswordReq {
		@Schema(description = "이메일")
		@ValidEmail(message = "{InvalidEmail}")
		@NotNull
		private String email;

		@Schema(description = "비밀번호")
		@NotEmpty(message = "{NotEmpty}")
		private String password;

		@Builder
		public ResetPasswordReq(String email, String password) {
			this.email = email;
			this.password = password;
		}
	}

	@Getter
	@Setter
	@Builder
	public static class registeredAuthKey {
		@Schema(description = "카카오 key 값")
		private String kakaoKey;
		@Schema(description = "네이버 key 값")
		private String naverKey;
		@Schema(description = "구글 key 값")
		private String googleKey;

		@Builder
		public registeredAuthKey(String kakaoKey, String naverKey, String googleKey) {
			this.kakaoKey = kakaoKey;
			this.naverKey = naverKey;
			this.googleKey = googleKey;
		}
	}

	@Getter
	@Setter
	@Builder
	@NoArgsConstructor
	public static class userInfoWithAuthorities {
		@Schema(description = "유저 식별번호")
		private Long id;
		@Schema(description = "이메일")
		private String email;
		@Schema(description = "이름")
		private String nickname;

		@Schema(description = "권한 리스트")
		private List<AuthorityDto> authorities;

		@Builder
		public userInfoWithAuthorities(Long id, String email, String nickname, List<AuthorityDto> authorities) {
			this.id = id;
			this.email = email;
			this.nickname = nickname;
			this.authorities = authorities;
		}
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class userInfoForView {
		@Schema(description = "유저 식별번호")
		private Long id;
		@Schema(description = "권한 리스트")
		private List<String> authorities;
		@Schema(description = "이메일")
		private String email;
		@Schema(description = "카카오 key값")
		private String kakaoKey;
		@Schema(description = "네이버 key값")
		private String naverKey;
		@Schema(description = "구글 key값")
		private String googleKey;
		@Schema(description = "이름")
		private String nickname;
		@Schema(description = "핸드폰 번호")
		private String phone;
		@Schema(description = "2차 인증 사용 여부")
		private boolean using2FA;

		@Builder
		public userInfoForView(Long id, List<String> authorities, String email, String kakaoKey, String naverKey,
				String googleKey, String nickname, String phone, boolean using2FA) {
			this.id = id;
			this.authorities = authorities;
			this.email = email;
			this.kakaoKey = kakaoKey;
			this.naverKey = naverKey;
			this.googleKey = googleKey;
			this.nickname = nickname;
			this.phone = phone;
			this.using2FA = using2FA;
		}
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class UserPageData {
		@Schema(description = "유저 식별번호")
		private Long id;
		@Schema(description = "이메일")
		private String email;
		@Schema(description = "핸드폰 번호")
		private String phone;
		@Schema(description = "이름")
		private String nickname;
		@Schema(description = "계정만료")
		private boolean accountNonExpired;
		@Schema(description = "계정잠금")
		private boolean accountNonLocked;
		@Schema(description = "자격증명")
		private boolean credentialsNonExpired;
		@Schema(description = "권한 리스트")
		private Set<String> authorities;
		@Schema(description = "클라이언트 권한 리스트")
		private Set<String> clientAuthorities;

		public UserPageData(Long id, String email, String phone, String nickname, boolean accountNonExpired,
				boolean accountNonLocked, boolean credentialsNonExpired, Set<String> authorities,
				Set<String> clientAuthorities) {
			this.id = id;
			this.email = email;
			this.phone = phone;
			this.nickname = nickname;
			this.accountNonExpired = accountNonExpired;
			this.accountNonLocked = accountNonLocked;
			this.credentialsNonExpired = credentialsNonExpired;
			this.authorities = authorities;
			this.clientAuthorities = clientAuthorities;
		}

	}

	/**
	 * 생체인증,소셜인증 검색 결과용
	 */
	@Getter
	@Setter
	@NoArgsConstructor
	public static class authTypeResDto {
		@Schema(description = "유저 식별번호")
		private Long id;
		@Schema(description = "카카오 key값")
		private String kakaoKey;
		@Schema(description = "네이버 key값")
		private String naverKey;
		@Schema(description = "구글 key값")
		private String googleKey;
		@Schema(description = "이름")
		private String nickname;
		@Schema(description = "UserEntity에서 webauthn 추출")
		private Set<Long> authenticators;

		@Builder
		public authTypeResDto(Long id, String kakaoKey, String naverKey, String googleKey, String nickname,
				Set<Long> authenticators) {
			this.id = id;
			this.kakaoKey = kakaoKey;
			this.naverKey = naverKey;
			this.googleKey = googleKey;
			this.nickname = nickname;
			this.authenticators = authenticators;
		}
	}

	/**
	 * 생체인증,소셜인증 그리드에서 검색 전달용
	 */
	@Getter
	@Setter
	@NoArgsConstructor
	public static class authTypeReqDto extends PageableDto {
		@Valid // List안쪽의 값도 Vali를 하기 위해 추가
		private List<SearchCriteria> searchCriteriaList;

		@Pattern(regexp = "^(all|any)$")
		private String dataOption;

		// DB에서 sort 가능한 column명 확인후 추가
		@Pattern(regexp = "^(id|nickname)$")
		@Override
		public String getSort() {
			return super.getSort();
		}
	}

}
