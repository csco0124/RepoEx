package com.exam.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.exam.dto.MemberDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{
	private final PasswordEncoder passwordEncoder;
	
	/**
	 * MemberService.login 메서드에서 실행됨
	 */
	@Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MemberDto dto = new MemberDto();
		dto.setMemberId("test");
		List<String> roles = new ArrayList<String>();
		roles.add("ADMIN");
		roles.add("USER");
		dto.setRoles(roles);
		return dto;
//        return memberRepository.findByMemberId(username)
//                .map(this::createUserDetails)
//                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
    }
	
}
