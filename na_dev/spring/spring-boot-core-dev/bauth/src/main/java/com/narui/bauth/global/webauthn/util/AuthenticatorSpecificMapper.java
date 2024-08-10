package com.narui.bauth.global.webauthn.util;

import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.domain.webauthn.dto.AuthenticatorForm;
import com.narui.bauth.domain.webauthn.entity.AuthenticatorEntity;
import com.webauthn4j.util.Base64UrlUtil;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Component
public class AuthenticatorSpecificMapper {

    public Set<AuthenticatorForm> mapToAuthenticatorFormList(Set<AuthenticatorEntity> authenticatorEntities) {
        return authenticatorEntities.stream()
                .map(this::mapToAuthenticatorForm)
                .collect(Collectors.toSet());
    }

    private AuthenticatorForm mapToAuthenticatorForm(AuthenticatorEntity authenticatorEntity) {
        return new AuthenticatorForm(
                authenticatorEntity.getId(),
                Base64UrlUtil.encodeToString(authenticatorEntity.getAttestedCredentialData().getCredentialId()),
                authenticatorEntity.getName()
        );
    }

    public UserDto.ProfileForm mapToProfileForm(UserEntity userEntity) {
        return UserDto.ProfileForm.builder()
                .email(userEntity.getEmail())
                .username(userEntity.getNickname())
                .authenticators(mapToAuthenticatorFormList(userEntity.getAuthenticators()))
                .build();
    }

    public UserEntity mapForUpdate(UserDto.ProfileForm profileForm, UserEntity userEntity) {
    	log.info("mapper profileForm :: {}", profileForm);
        // user
        if (!profileForm.getUsername().equals(userEntity.getNickname())) {
            userEntity.updateNickname(profileForm.getUsername());
        }
        // authenticator
        Set<AuthenticatorForm> profileFormAuthenticators = profileForm.getAuthenticators();
        Set<AuthenticatorEntity> userEntityAuthenticators = userEntity.getAuthenticators();

        //webauthn을 user와 1대1 비율로 가져가기 위한 코드
        userEntityAuthenticators.clear();
        
        for (AuthenticatorForm authenticatorForm : profileFormAuthenticators) {
            Long id = authenticatorForm.getId();

            // 추가
            if (id == null) {
                userEntityAuthenticators.add(authenticatorForm.toEntity());
            } else {
                // 수정
                AuthenticatorEntity entity = userEntityAuthenticators.stream()
                        .filter(item -> id.equals(item.getId()))
                        .findAny().orElseThrow();

                entity.setName(authenticatorForm.getName());
            }
        }

//        // 삭제
//        userEntityAuthenticators.removeIf(authenticatorEntity -> {
//            Long id = authenticatorEntity.getId();
//            if (id == null) {
//                return false;
//            }
//
//            return profileFormAuthenticators.stream()
//                    .map(AuthenticatorForm::getId)
//                    .noneMatch(i -> id.equals(i));
//        });

        return userEntity;
    }
}
