package com.narui.bauth.global.rememberMe.entity;

import lombok.Getter;
import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;

@Getter
@Entity
@Table(name = "persistent_logins")
public class PersistentLogin {

    @Id
    private String series;

    @Column(nullable = false, length = 64)
    private String username;

    @Column(nullable = false, length = 64)
    private String token;

    @Column(nullable = false)
    private Date lastUsed;

    protected PersistentLogin() {

    }
    private PersistentLogin(PersistentRememberMeToken token) {
        this.series = token.getSeries();
        this.username = token.getUsername();
        this.token = token.getTokenValue();
        this.lastUsed = token.getDate();
    }

    public static PersistentLogin from(PersistentRememberMeToken token) {
        return new PersistentLogin(token);
    }

    public void updateToken(String tokenValue, Date lastUsed) {
        this.token = tokenValue;
        this.lastUsed = lastUsed;
    }
}
