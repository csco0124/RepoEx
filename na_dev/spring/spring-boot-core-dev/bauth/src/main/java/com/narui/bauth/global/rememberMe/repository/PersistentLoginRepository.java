package com.narui.bauth.global.rememberMe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.narui.bauth.global.rememberMe.entity.PersistentLogin;

import java.util.List;

public interface PersistentLoginRepository extends JpaRepository<PersistentLogin, String> {
    List<PersistentLogin> findByUsername(String username);
}
