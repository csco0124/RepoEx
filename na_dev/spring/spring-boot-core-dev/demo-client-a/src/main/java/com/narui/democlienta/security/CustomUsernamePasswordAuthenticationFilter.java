package com.narui.democlienta.security;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.stream.Collectors;

public class CustomUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private HashMap<String, String> requestMap;
    private boolean isApplicationJson = false;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        if (!request.getMethod().equals(HttpMethod.POST.name())) {
            throw new AuthenticationServiceException("Login method not supported: ".concat(request.getMethod()));
        }

        if (MediaType.APPLICATION_JSON_VALUE.equals(request.getContentType())) {
            isApplicationJson = true;
            ObjectMapper objectMapper = new ObjectMapper();

            try {
                requestMap = objectMapper.readValue(request.getReader().lines().collect(Collectors.joining()), new TypeReference<>() {
                });
            } catch (IOException e) {
                throw new AuthenticationServiceException("Request parse error : " + e.getMessage());
            }
        }

        String username = obtainUsername(request);
        String password = obtainPassword(request);

        if (username == null) {
            username = "";
        }

        if (password == null) {
            password = "";
        }

        username = username.trim();

        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);

        setDetails(request, authRequest);

        return this.getAuthenticationManager().authenticate(authRequest);
    }

    @Override
    protected String obtainUsername(HttpServletRequest request) {
        if (isApplicationJson) {
            return requestMap.get(getUsernameParameter());
        }

        return request.getParameter(getUsernameParameter());
    }

    @Override
    protected String obtainPassword(HttpServletRequest request) {
        if (isApplicationJson) {
            return requestMap.get(getPasswordParameter());
        }

        return request.getParameter(getPasswordParameter());
    }
}
