package com.narui.bauth.global.config;

import com.narui.common.security.exception.AjaxAccessDeniedHandler;
import com.narui.common.security.exception.AjaxAuthenticationEntryPoint;
import com.narui.common.util.Jwks;
import com.narui.common.util.SecurityUtil;
import com.narui.bauth.global.mfa.user.MultiFactorUserDetails;
import com.narui.bauth.global.util.PrincipalUtil;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.core.oidc.StandardClaimNames;
import org.springframework.security.oauth2.core.oidc.endpoint.OidcParameterNames;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.authorization.OAuth2TokenType;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.server.authorization.oidc.authentication.OidcUserInfoAuthenticationProvider;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;
import org.springframework.security.web.SecurityFilterChain;
import java.util.List;

@Configuration(proxyBeanMethods = false)
public class AuthorizationServerConfig {

  @Value("${jwt.issuer-uri}")
  private String issuerUri;

  private final AjaxAuthenticationEntryPoint authenticationEntryPoint;
  private final AjaxAccessDeniedHandler accessDeniedHandler;
  private final PrincipalUtil principalUtil;

  public AuthorizationServerConfig(AjaxAuthenticationEntryPoint authenticationEntryPoint,
      AjaxAccessDeniedHandler accessDeniedHandler, PrincipalUtil principalUtil) {

    this.authenticationEntryPoint = authenticationEntryPoint;
    this.accessDeniedHandler = accessDeniedHandler;
    this.principalUtil = principalUtil;
  }

  @Bean
  @Order(Ordered.HIGHEST_PRECEDENCE)
  SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
    OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);

    http.getConfigurer(OAuth2AuthorizationServerConfigurer.class).oidc(Customizer.withDefaults());  // Enable OpenID Connect 1.0

    http.oauth2ResourceServer(server -> server.jwt());

    http.exceptionHandling(handling -> handling.authenticationEntryPoint(authenticationEntryPoint)
        .accessDeniedHandler(accessDeniedHandler));

    return http.build();
  }

  @Bean
  JWKSource<SecurityContext> jwkSource() {
    RSAKey rsaKey = Jwks.generateRsa();
    JWKSet jwkSet = new JWKSet(rsaKey);
    return (jwkSelector, securityContext) -> jwkSelector.select(jwkSet);
  }

  @Bean
  JwtDecoder jwtDecoder(JWKSource<SecurityContext> jwkSource) {
    return OAuth2AuthorizationServerConfiguration.jwtDecoder(jwkSource);
  }

  @Bean 
	AuthorizationServerSettings authorizationServerSettings() {
		return AuthorizationServerSettings.builder().issuer(issuerUri).build();
	}

  /**
   * JWT 토큰을 생성할때 claim 을 추가/수정 할 수 있습니다.
   * <p>
   * <code>OAuth2TokenType.ACCESS_TOKEN</code> claim 은 clientServer 를 통해 resourceServer 로 전달되며 roles
   * 를 통해 권한을 확인합니다.
   * </p>
   * <p>
   * <code>OidcParameterNames.ID_TOKEN</code> claim 은 clientServer 에서 사용자 로그인에 필요한 정보를 전달합니다.
   * </p>
   * 
   * @see OidcUserInfoAuthenticationProvider
   */
  @Bean
  OAuth2TokenCustomizer<JwtEncodingContext> tokenCustomizer() {
    return context -> {            
      if (context.getTokenType() == OAuth2TokenType.ACCESS_TOKEN) {        
        Authentication principal = context.getPrincipal();
        List<String> authorities = SecurityUtil.getAuthorities(principal);
        //권한만 추가
        context.getClaims().claim("roles", authorities);

      } else if (context.getTokenType().getValue().equals(OidcParameterNames.ID_TOKEN)) {        
    	SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Authentication principal = context.getPrincipal();
        List<String> authorities = SecurityUtil.getAuthorities(principal);
        MultiFactorUserDetails user = (MultiFactorUserDetails) principalUtil.getPrincipal(principal);
//      MultiFactorUserDetails user = (MultiFactorUserDetails) principal.getPrincipal();
        //권한 + 유저정보 추가
        context.getClaims().claim("roles", authorities);        
        context.getClaims().claim(StandardClaimNames.EMAIL, user.getEmail());
        context.getClaims().claim(StandardClaimNames.NAME, user.getNickname());        
        context.getClaims().claim(OidcScopes.PHONE, user.getPhone());
      }
    };
  }
}
