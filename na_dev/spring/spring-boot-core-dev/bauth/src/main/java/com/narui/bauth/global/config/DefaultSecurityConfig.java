package com.narui.bauth.global.config;

import java.awt.image.BufferedImage;
import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.BufferedImageHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.firewall.HttpStatusRequestRejectedHandler;
import org.springframework.security.web.firewall.RequestRejectedHandler;

import com.narui.bauth.domain.authority.enumeration.AuthorityEnum;
import com.narui.bauth.domain.user.repository.UserRepository;
import com.narui.bauth.global.csrf.handler.CustomCsrfTokenRequestAttributeHandler;
import com.narui.bauth.global.mfa.authentication.MultiFactorAuthenticationDetailsSource;
import com.narui.bauth.global.mfa.authentication.MultiFactorAuthenticationProvider;
import com.narui.bauth.global.mfa.user.MultiFactorUserDetailsService;
import com.narui.bauth.global.oauth2.handler.CustomOauth2AuthenticationFailureHandler;
import com.narui.bauth.global.oauth2.handler.CustomOauth2AuthenticationSuccessHandler;
import com.narui.bauth.global.oauth2.service.CustomOauth2UserService;
import com.narui.bauth.global.rememberMe.repository.PersistentTokenRepositoryImpl;
import com.narui.bauth.global.rememberMe.service.CustomRememberMeServices;
import com.narui.common.security.exception.AjaxAccessDeniedHandler;
import com.narui.common.security.exception.AjaxAuthenticationEntryPoint;
import com.narui.common.security.exception.AjaxAuthenticationFailureHandler;
import com.narui.common.security.exception.AjaxAuthenticationSuccessHandler;
import com.narui.common.security.exception.RedirectLogoutSuccessHandler;
import com.webauthn4j.WebAuthnManager;
import com.webauthn4j.data.AttestationConveyancePreference;
import com.webauthn4j.data.PublicKeyCredentialParameters;
import com.webauthn4j.data.PublicKeyCredentialType;
import com.webauthn4j.data.ResidentKeyRequirement;
import com.webauthn4j.data.UserVerificationRequirement;
import com.webauthn4j.data.attestation.statement.COSEAlgorithmIdentifier;
import com.webauthn4j.springframework.security.WebAuthnAuthenticationProvider;
import com.webauthn4j.springframework.security.authenticator.WebAuthnAuthenticatorService;
import com.webauthn4j.springframework.security.config.configurers.WebAuthnLoginConfigurer;

import lombok.Getter;

@Configuration
@EnableWebSecurity
public class DefaultSecurityConfig {
	// handler
	private final AjaxAuthenticationEntryPoint authenticationEntryPoint;
	private final AjaxAccessDeniedHandler accessDeniedHandler;
	private final AjaxAuthenticationSuccessHandler authenticationSuccessHandler;
	private final AjaxAuthenticationFailureHandler authenticationFailureHandler;
	private final CustomCsrfTokenRequestAttributeHandler csrfTokenRequestAttributeHandler;

	// mfa
	private final MultiFactorUserDetailsService userDetailsService;
	private final MultiFactorAuthenticationDetailsSource authenticationDetailsSource;
	private final UserRepository userRepository;
	private final MessageSource messageSource;

	private final WebAuthnAuthenticatorService authenticatorService;
	private final WebAuthnManager webAuthnManager;
	private final PersistentTokenRepositoryImpl persistentTokenRepository;
	private final RedirectLogoutSuccessHandler logoutSuccessHandler;

	private final CustomOauth2UserService customOauth2UserService;
	private final CustomOauth2AuthenticationFailureHandler customOauth2Fail;
	private final CustomOauth2AuthenticationSuccessHandler customOauth2Success;
	
	public DefaultSecurityConfig(AjaxAuthenticationEntryPoint authenticationEntryPoint,
			AjaxAccessDeniedHandler accessDeniedHandler,
			AjaxAuthenticationSuccessHandler authenticationSuccessHandler,
			AjaxAuthenticationFailureHandler authenticationFailureHandler,
			RedirectLogoutSuccessHandler logoutSuccessHandler,
			CustomCsrfTokenRequestAttributeHandler csrfTokenRequestAttributeHandler,
			MultiFactorUserDetailsService userDetailsService, MessageSource messageSource,
			MultiFactorAuthenticationDetailsSource authenticationDetailsSource,
			UserRepository userRepository, WebAuthnAuthenticatorService authenticatorService,
			WebAuthnManager webAuthnManager, PersistentTokenRepositoryImpl persistentTokenRepository,
			CustomOauth2UserService customOauth2UserService,
			CustomOauth2AuthenticationFailureHandler customOauth2Fail,
			CustomOauth2AuthenticationSuccessHandler customOauth2Success
			) {

		this.authenticationEntryPoint = authenticationEntryPoint;
		this.accessDeniedHandler = accessDeniedHandler;
		this.authenticationSuccessHandler = authenticationSuccessHandler;
		this.authenticationFailureHandler = authenticationFailureHandler;
		this.logoutSuccessHandler = logoutSuccessHandler;
		this.csrfTokenRequestAttributeHandler = csrfTokenRequestAttributeHandler;

		this.userDetailsService = userDetailsService;
		this.messageSource = messageSource;
		this.authenticationDetailsSource = authenticationDetailsSource;
		this.userRepository = userRepository;
		this.authenticatorService = authenticatorService;
		this.webAuthnManager = webAuthnManager;
		this.persistentTokenRepository = persistentTokenRepository;
		this.customOauth2UserService = customOauth2UserService;
		this.customOauth2Fail = customOauth2Fail;
		this.customOauth2Success = customOauth2Success;
	}

	/**
	 * SavedRequest 의 경우 같은 경로의 일반 호출과 ajax 호출을 구분하지 않고 같은 호출로 인식하기 때문에 오류 발생
	 * api 경로와 page 경로를 반드시 분리해야됨.
	 * /public/view  (public,view: 생략가능  private,api: 필수)
	 *        /api
	 * /private/view
	 *         /api
	 */
	@Bean
	SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
		// webauthn config
		webauthnConfig(http);

		http.authenticationProvider(
				new WebAuthnAuthenticationProvider(authenticatorService, webAuthnManager))
				//swagger 테스트 진행할 때 disable처리하기
        		//.csrf(AbstractHttpConfigurer::disable)
				.csrf(httpSecurityCsrfConfigurer -> { httpSecurityCsrfConfigurer
					// 클라이언트 측 스크립트를 통해 쿠키에 액세스 방지
					.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
					// 토큰 값 검증 핸들러
					.csrfTokenRequestHandler(csrfTokenRequestAttributeHandler)
					// csrf 토큰 검증 제외 url
					.ignoringRequestMatchers(
						"/api/revoke",
						"/webauthn/**",
						"/user-management/**",
						"/mail/**",
						"/oauth2/authorization/**",
						"/login/oauth2/code/**",
						"/cmm/*",
						"/dummy/**",
						"/html/**",
						"/logout"
					);
				})
				.sessionManagement(
						management -> management.sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
								.sessionFixation().newSession())
				.authorizeHttpRequests(expressionInterceptUrlRegistry -> { expressionInterceptUrlRegistry
							//actuator
							.requestMatchers(EndpointRequest.toAnyEndpoint()).permitAll()
							// static resource
							.requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()   // css, js, images, favicon, webjars
							
							.requestMatchers("/user/auth/authenticatedhome", "/user/social/social-list").hasRole(AuthorityEnum.AUTHORITY_USER.getAuthority())
							.requestMatchers("/api/revoke", "/social/login-fail").permitAll()
							.requestMatchers("/private/view/403", "/private/api/403").hasRole("TEST403")
							
							//순서 중요
							.requestMatchers(AuthorizeEnum.PERMIT_ALL_PATH.getPath()).permitAll()
							.requestMatchers(AuthorizeEnum.PRE_AUTH_PATH.getPath()).hasRole(AuthorityEnum.AUTHORITY_PRE_AUTH.getAuthority())
							.requestMatchers(AuthorizeEnum.ADMIN_PATH.getPath()).hasRole(AuthorityEnum.AUTHORITY_ADMIN.getAuthority())
							.requestMatchers(AuthorizeEnum.USER_PATH.getPath()).hasRole(AuthorityEnum.AUTHORITY_USER.getAuthority())
							;
				}).formLogin(httpSecurityFormLoginConfigurer -> {
					httpSecurityFormLoginConfigurer//.loginPage("/public/view/auth/login")
							.loginProcessingUrl("/login")
							.usernameParameter("email")
							.successHandler(authenticationSuccessHandler)
							.failureHandler(authenticationFailureHandler)
							.authenticationDetailsSource(authenticationDetailsSource); // mfa 적용
				}).rememberMe(httpSecurityRememberMeConfigurer -> {
					HashMap<String, String> rememberMeParam = new HashMap<>();

					int month = 60 * 60 * 24 * 30;
					
					//커스텀 된 RememberMeServices에는 값 전달이 안돼서 직접 보내기위한 parameter
					rememberMeParam.put("key", "bauth");
					rememberMeParam.put("tokenValiditySeconds", String.valueOf(month));
					rememberMeParam.put("alwaysRemember", "false"); // 항상 rememberMe 적용
//					rememberMeParam.put("rememberMeParameter", "remember-me");
//					rememberMeParam.put("rememberMeCookieName", "remember-me");
//					rememberMeParam.put("rememberMeCookieDomain", null);
//					rememberMeParam.put("useSecureCookie", "false");
					
					httpSecurityRememberMeConfigurer.tokenValiditySeconds(Integer.parseInt(rememberMeParam.get("tokenValiditySeconds")));
					httpSecurityRememberMeConfigurer.key(rememberMeParam.get("key"));
					httpSecurityRememberMeConfigurer.alwaysRemember(Boolean.parseBoolean(rememberMeParam.get("key"))); 
					
					httpSecurityRememberMeConfigurer.authenticationSuccessHandler(authenticationSuccessHandler);
					httpSecurityRememberMeConfigurer.tokenRepository(persistentTokenRepository);
					
					httpSecurityRememberMeConfigurer.rememberMeServices(rememberMeServices(rememberMeParam));
				}).logout(httpSecurityLogoutConfigurer -> {
					httpSecurityLogoutConfigurer.deleteCookies(
							PersistentTokenBasedRememberMeServices.SPRING_SECURITY_REMEMBER_ME_COOKIE_KEY);
					httpSecurityLogoutConfigurer.logoutSuccessHandler(logoutSuccessHandler);
				}).exceptionHandling(httpSecurityExceptionHandlingConfigurer -> {
					httpSecurityExceptionHandlingConfigurer
							.authenticationEntryPoint(authenticationEntryPoint)
							.accessDeniedHandler(accessDeniedHandler);
				}).oauth2ResourceServer(httpSecurityOauth2ResourceServerConfigurer -> {
					httpSecurityOauth2ResourceServerConfigurer.jwt(jwtConfigurer -> {
						jwtConfigurer.jwtAuthenticationConverter(jwtAuthenticationConverter());
					});
				});

		//oauth2 config
		http
			.oauth2Login(oauth2 -> oauth2
				.userInfoEndpoint()
					.userService(customOauth2UserService)
				.and()
				.successHandler(customOauth2Success)
//				.defaultSuccessUrl("/user/auth/authenticatedhome")
				.failureHandler(customOauth2Fail)
			);

		//defaultSuccessUrl 설정
		customOauth2Success.setDefaultTargetUrl("/user/auth/authenticatedhome");

		return http.build();
	}

	private void webauthnConfig(HttpSecurity http) throws Exception {
		/*
		 * 스펙 참조 https://w3c.github.io/webauthn/#dictdef-publickeycredentialcreationoptions
		 */
		http.apply(WebAuthnLoginConfigurer.webAuthnLogin())
				.loginProcessingUrl("/webauthn/login")
				.successHandler(authenticationSuccessHandler)
				.failureHandler(authenticationFailureHandler)
				.attestationOptionsEndpoint()
				//.attestationOptionsProvider(attestationOptionsProvider())
				.rp().name("Narui Authorization Server")	//Relying Party
				.and()
				.pubKeyCredParams(
						new PublicKeyCredentialParameters(PublicKeyCredentialType.PUBLIC_KEY,
								COSEAlgorithmIdentifier.ES256),
						new PublicKeyCredentialParameters(PublicKeyCredentialType.PUBLIC_KEY,
								COSEAlgorithmIdentifier.RS1),
						new PublicKeyCredentialParameters(PublicKeyCredentialType.PUBLIC_KEY,
								COSEAlgorithmIdentifier.RS256))
				.authenticatorSelection()
				//.authenticatorAttachment(AuthenticatorAttachment.CROSS_PLATFORM) // 현재는 All
				// Supported
				.residentKey(ResidentKeyRequirement.PREFERRED)
				.userVerification(UserVerificationRequirement.REQUIRED)
				.and()
				.attestation(AttestationConveyancePreference.NONE)	//증명 양도 우대 No credential(신임장) is required.
				.extensions().uvm(true).credProps(true).extensionProviders()	//User Verification Method
				.and()
				.assertionOptionsEndpoint().timeout(60000L)
				.extensions().extensionProviders();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// MFA
	@Bean
	DaoAuthenticationProvider authProvider() {
		MultiFactorAuthenticationProvider authProvider = new MultiFactorAuthenticationProvider(userRepository);
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());
		authProvider.setMessageSource(messageSource);
		return authProvider;
	}

	// for qrcode
	@Bean
	HttpMessageConverter<BufferedImage> createImageHttpMessageConverter() {
		return new BufferedImageHttpMessageConverter();
	}
	
	@Bean
	CustomRememberMeServices rememberMeServices(Map<String, String> rememberMeParam) {
		String key = rememberMeParam.get("key");
		String parameter = rememberMeParam.get("rememberMeParameter");
		String cookieName = rememberMeParam.get("rememberMeCookieName");
		String rememberMeCookieDomain = rememberMeParam.get("rememberMeCookieDomain");
		int tokenValiditySeconds = Integer.parseInt(rememberMeParam.get("tokenValiditySeconds"));
		boolean useSecureCookie = Boolean.parseBoolean(rememberMeParam.get("useSecureCookie"));
		boolean alwaysRemember = Boolean.parseBoolean(rememberMeParam.get("alwaysRemember"));
		
		return new CustomRememberMeServices(
			key
			, userDetailsService
			, persistentTokenRepository
			, parameter
			, cookieName
			, rememberMeCookieDomain
			, tokenValiditySeconds
			, useSecureCookie
			, alwaysRemember
		);
	}

	/*
	 * Authorization Server 로 부터 발급받은 JWT 에서 권한이 들어있는 Claim 을 지정하고, 권한을 설정합니다. - roles : JWT 내에서 사용자
	 * 권한이 담겨있는 배열입니다.
	 */
	private JwtAuthenticationConverter jwtAuthenticationConverter() {
		JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter =
				new JwtGrantedAuthoritiesConverter();
		jwtGrantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
		jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
		JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
		jwtAuthenticationConverter
				.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
		return jwtAuthenticationConverter;
	}

	// RequestRejectedException 예외처리.
	@Bean
	RequestRejectedHandler requestRejectedHandler() {
		return new HttpStatusRequestRejectedHandler(); // Default status code is 400. Can be
														// customized
	}
	
//    @Bean
//    CustomAttestationOptionsProviderImpl attestationOptionsProvider(){
//        return new CustomAttestationOptionsProviderImpl();
//    }
	
	@Getter
	public enum AuthorizeEnum{
		PERMIT_ALL_PATH("/", "/html/**", "/font/**", "/error/**", "/auth/**", "/user/**", "/assets/**", "/public/**", "/oauth2/**", "/cmm/**"),
		PRE_AUTH_PATH("/private/view/auth/challengeTotp"),
		ADMIN_PATH("/private/view/admin/**", "/private/api/admin/**"),
		USER_PATH("/user-management/**", "/mail/**", "/private/view/**", "/private/api/**", "/swagger-ui/**", "/docs/**", "/api/**", "/profile");

		private final String[] path;
		private AuthorizeEnum(String... path){
			this.path = path;
		}
	}
}
