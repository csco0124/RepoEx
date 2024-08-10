package com.narui.democlienta.security;

import com.narui.democlienta.security.handler.CustomAccessDeniedHandler;
import com.narui.democlienta.security.handler.CustomAuthenticationEntryPoint;
import com.narui.democlienta.security.handler.CustomAuthenticationFailHandler;
import com.narui.democlienta.security.handler.CustomAuthorizationRequestResolver;
import com.narui.democlienta.security.handler.CustomLogoutSuccessHandler;
import com.narui.democlienta.security.handler.OAuth2AuthenticationSuccessHandler;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@Configuration
public class SecurityConfig {

    private final OAuth2AuthenticationSuccessHandler authenticationSuccessHandler;
    private final ClientRegistrationRepository clientRegistrationRepository;
    
    @Value("${client-authority}")
    private String clientAuthority;

    public SecurityConfig(
            OAuth2AuthenticationSuccessHandler authenticationSuccessHandler
            ,ClientRegistrationRepository clientRegistrationRepository
    ) {
        this.authenticationSuccessHandler = authenticationSuccessHandler;
        this.clientRegistrationRepository = clientRegistrationRepository;
    }

    // 정적 자원에 대해서는 Security 설정을 적용하지 않음 .
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> {
            web.ignoring().antMatchers("/v2/api-docs");
            web.ignoring().antMatchers("/swagger-ui.html");
            web.ignoring().antMatchers("/webjars/**");
            web.ignoring().antMatchers("/swagger/**");
            web.ignoring().antMatchers("/actuator/**");
            web.ignoring().antMatchers("/css/*");
            web.ignoring().antMatchers("/js/*");
            web.ignoring().antMatchers("/font/*");
            web.ignoring().antMatchers("/data/images/*");
            web.ignoring().antMatchers("/auto/commute/*");
            web.ignoring().antMatchers("/auto/*.do");
            web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
        };
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf().disable();
        http.formLogin().disable(); // oauth2 기능만 사용하는것으로 변경됨에 따라 disable
        http.httpBasic().disable();

        /* 요청 URL 패턴별 권한 설정 */
        http.authorizeHttpRequests(expressionInterceptUrlRegistry -> {
            /* 모두허용 */
            expressionInterceptUrlRegistry
            .mvcMatchers("/private/view/defaultAuth/admin/**").hasRole("ADMIN")
            .mvcMatchers("/private/view/defaultAuth/user/**","/private/view/home").hasRole("USER")
            .mvcMatchers("/private/**").hasRole(clientAuthority)
            .mvcMatchers(
                    "/login/**",
                    "/logout",
                    "/public/**",
                    "/homepage",
                    "/"
            ).permitAll()
            /* 그 외 전부 로그인 필요 */
            .anyRequest().authenticated();
            
        }).exceptionHandling(httpSecurityExceptionHandlingConfigurer -> {
            //httpSecurityExceptionHandlingConfigurer.authenticationEntryPoint(authenticationEntryPoint());
            httpSecurityExceptionHandlingConfigurer.accessDeniedHandler(accessDeniedHandler());
        });

        /* oauth2 로그인 */
        http.oauth2Login(httpSecurityOAuth2LoginConfigurer -> {
            httpSecurityOAuth2LoginConfigurer.loginPage("/oauth2/authorization/nauth");
            httpSecurityOAuth2LoginConfigurer.successHandler(authenticationSuccessHandler);
            httpSecurityOAuth2LoginConfigurer.authorizationEndpoint().authorizationRequestResolver(
            		authorizationRequestResolver());
        }).oauth2Client(Customizer.withDefaults());

        /* 로그아웃 설정 */
        http.logout(httpSecurityLogoutConfigurer -> {
            httpSecurityLogoutConfigurer.logoutSuccessHandler(logoutSuccessHandler());
            httpSecurityLogoutConfigurer.invalidateHttpSession(true);
            httpSecurityLogoutConfigurer.deleteCookies("JSESSIONID", "remember-me");
            httpSecurityLogoutConfigurer.clearAuthentication(true);
        });

        return http.build();
    }

    @Bean
    protected AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    protected OAuth2AuthorizationRequestResolver authorizationRequestResolver() {
    	return new CustomAuthorizationRequestResolver(clientRegistrationRepository, "/oauth2/authorization");
    }
    
    @Bean
    protected AccessDeniedHandler accessDeniedHandler() {
    	return new CustomAccessDeniedHandler();
    }
    
    @Bean
    protected AuthenticationEntryPoint authenticationEntryPoint() {
    	return new CustomAuthenticationEntryPoint();
    }

    @Bean
    protected AuthenticationFailureHandler authenticationFailureHandler() {
        return new CustomAuthenticationFailHandler();
    }

    @Bean
    protected LogoutSuccessHandler logoutSuccessHandler() {
        return new CustomLogoutSuccessHandler();
    }

//    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }
    
    @Bean
    protected OAuth2AuthorizedClientRepository authorizedClientRepository() {
        return new HttpSessionOAuth2AuthorizedClientRepository();
    }
}
