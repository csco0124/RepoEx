package com.narui.democlienta.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientProvider;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientProviderBuilder;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

import reactor.core.publisher.Mono;

@Configuration
public class WebClientConfig {
	
	@Bean
    public WebClient webClient(OAuth2AuthorizedClientManager oAuth2AuthorizedClientManager) {
        ServletOAuth2AuthorizedClientExchangeFilterFunction oAuth2Client =
                new ServletOAuth2AuthorizedClientExchangeFilterFunction(oAuth2AuthorizedClientManager);
        oAuth2Client.setDefaultOAuth2AuthorizedClient(true);
        return WebClient.builder()
                .filter(webclientExceptionFilter())
                /**
                 * ServletOAuth2AuthorizedClientExchangeFilterFunction.oauth2Configuration()
                 * OAuth2 인증 서버에서 액세스 토큰을 얻는 데 필요한 인증 매개변수를 설정하는 데 사용됩니다.
                 * @return builder.defaultRequest(defaultRequest()).filter(this);
                 */
                .apply(oAuth2Client.oauth2Configuration())
                .build();
    }
	
	private ExchangeFilterFunction webclientExceptionFilter() {
        return ExchangeFilterFunction.ofResponseProcessor(clientResponse -> {
            if (HttpStatus.UNAUTHORIZED == clientResponse.statusCode()) {
                return clientResponse.bodyToMono(String.class)
                        .flatMap(it ->
                                Mono.error(new ResponseStatusException(
                                        clientResponse.statusCode(),
                                        "This user is not authenticated. Please log in")));
            }

            if (HttpStatus.FORBIDDEN == clientResponse.statusCode()) {
                return clientResponse.bodyToMono(String.class)
                        .flatMap(it ->
                                Mono.error(new ResponseStatusException(
                                        clientResponse.statusCode(),
                                        "you are not allowed to access to this resource")));
            }
            return Mono.just(clientResponse);
        });
    }
	
	@Bean
    OAuth2AuthorizedClientManager oAuth2AuthorizedClientManager(
            ClientRegistrationRepository clientRegistrationRepository,
            OAuth2AuthorizedClientRepository oAuth2AuthorizedClientRepository
    ) {

        OAuth2AuthorizedClientProvider oAuth2AuthorizedClientProvider =
                OAuth2AuthorizedClientProviderBuilder.builder()
                        .authorizationCode()
                        .refreshToken()
                        .clientCredentials()
                        .build();

        DefaultOAuth2AuthorizedClientManager authorizedClientManager =
                new DefaultOAuth2AuthorizedClientManager(
                        clientRegistrationRepository,
                        oAuth2AuthorizedClientRepository
                );

        authorizedClientManager.setAuthorizedClientProvider(oAuth2AuthorizedClientProvider);

        return authorizedClientManager;
    }
}
