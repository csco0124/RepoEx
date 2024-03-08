package com.pilot.member.service;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.pilot.member.dao.MemberDao;
import com.pilot.member.dto.LoginMemberDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService implements UserDetailsService{
	
	private final MemberDao memberDao;

	private final BCryptPasswordEncoder passwordEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
		Map<String, Object> member = memberDao.getMember(id);
		if(member == null){
            throw new UsernameNotFoundException(id);
		}
        
		Set<GrantedAuthority> authorities = new HashSet<>();
		authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		
		LoginMemberDto loginMemberDto = new LoginMemberDto(
					""+member.get("id"),
					""+member.get("name"),
					""+member.get("password"),
					authorities
				);
		
		return loginMemberDto;
	}
	
	public void joinMember(Map<String, Object> param) throws Exception{
		Map<String, Object> member = memberDao.getMember(""+param.get("id"));
		if(member != null){
            throw new Exception("이미 존재하는 회원입니다.");
		}
		
		param.put("password", passwordEncoder.encode(""+param.get("password")));
		memberDao.insertMember(param);
	}
	
	public Map<String, Object> getCurdate() throws Exception {
		return memberDao.getCurdate();
	}
	
	public Map<String, Object> getMemberList() throws Exception {
		return memberDao.getMemberList();
	}
	
}
