package com.narui.common;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.server.Encoding;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

import lombok.extern.log4j.Log4j2;

@Configuration
public class MessageConfig {
	
    @Bean
    public LocaleResolver defaultLocaleResolver() {
        AcceptHeaderLocaleResolver localeResolver = new AcceptHeaderLocaleResolver();
        localeResolver.setDefaultLocale(Locale.KOREAN);

        return localeResolver;
    }

    @Bean
    public ReloadableResourceBundleMessageSource messageSource() {
        Locale.setDefault(Locale.KOREAN); // 제공하지 않는 언어로 들어왔을 때 처리

        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename("classpath:/messages/messages"); 
        messageSource.setDefaultEncoding(Encoding.DEFAULT_CHARSET.toString());	// UTF-8
        messageSource.setDefaultLocale(Locale.KOREAN);
        messageSource.setCacheSeconds(600);

        return messageSource;
    }

    @Bean
    public MessageSourceAccessor messageSourceAccessor (@Autowired ReloadableResourceBundleMessageSource messageSource) {
        return new MessageSourceAccessor(messageSource);
    }
}
