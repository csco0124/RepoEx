package com.narui.bauth.global.mfa.user;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.narui.bauth.domain.authority.entity.AuthorityEntity;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.domain.user.repository.UserRepository;
import com.narui.common.api.ErrorCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MultiFactorUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;
 
  @Transactional
  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    
    UserEntity user = userRepository.findByEmail(email);
        
    if ((user == null)) {
      throw new UsernameNotFoundException(ErrorCode.USERNOTFOUND.getErrMsg());
    }
    
    // @formatter:off          
    List<String> userAuthorities = user.getAuthorities().stream()
            .map(AuthorityEntity::getAuthority)
            .collect(Collectors.toList());

	//clientAuhtority 추가
	user.getClientAuthorities().stream().forEach(
			clientAuthorityEntity -> userAuthorities.add(clientAuthorityEntity.getClientRoleEntity().getAuthority())
	);
	
	// @formatter:off          
    List<SimpleGrantedAuthority> authorities = userAuthorities.stream()
			.map(SimpleGrantedAuthority::new)
			.collect(Collectors.toList());
    
    return MultiFactorUserDetails.builder()
            .id(user.getId())
            .email(user.getEmail())
            .phone(user.getPhone().getPhone())
            .using2FA(user.isUsing2FA())
            .secret(user.getSecret())
            .nickname(user.getNickname())
            .password(user.getPassword())
            .enabled(user.isEnabled())
            .accountNonExpired(user.isAccountNonExpired())
            .accountNonLocked(user.isAccountNonLocked())
            .credentialsNonExpired(user.isCredentialsNonExpired())
            .authorities(authorities)
            .kakaoKey(user.getKakaoKey())
            .naverKey(user.getNaverKey())
            .googleKey(user.getGoogleKey())
            .build();
    // @formatter:on
  }
}
