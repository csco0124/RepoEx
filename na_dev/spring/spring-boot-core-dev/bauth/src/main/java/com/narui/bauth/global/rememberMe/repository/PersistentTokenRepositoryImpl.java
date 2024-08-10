package com.narui.bauth.global.rememberMe.repository;

import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.stereotype.Component;

import com.narui.bauth.global.rememberMe.entity.PersistentLogin;

import java.util.Date;

@Component
public class PersistentTokenRepositoryImpl implements PersistentTokenRepository {

    private final PersistentLoginRepository persistentLoginRepository;

    public PersistentTokenRepositoryImpl(PersistentLoginRepository persistentLoginRepository) {
        this.persistentLoginRepository = persistentLoginRepository;
    }

    @Override
    public void createNewToken(PersistentRememberMeToken token) {
        persistentLoginRepository.save(PersistentLogin.from(token));
    }

    @Override
    public void updateToken(String series, String tokenValue, Date lastUsed) {
        persistentLoginRepository.findById(series)
                .ifPresent(persistentLogin -> {
                    persistentLogin.updateToken(tokenValue, lastUsed);
                    persistentLoginRepository.save(persistentLogin);
                });
    }

    @Override
    public PersistentRememberMeToken getTokenForSeries(String seriesId) {
        return persistentLoginRepository.findById(seriesId)
                .map(persistentLogin ->
                        new PersistentRememberMeToken(
                                persistentLogin.getUsername(),
                                persistentLogin.getSeries(),
                                persistentLogin.getToken(),
                                persistentLogin.getLastUsed()
                        ))
                .orElse(null);
    }

    @Override
    public void removeUserTokens(String username) {
        persistentLoginRepository.deleteAllInBatch(persistentLoginRepository.findByUsername(username));
    }
}
