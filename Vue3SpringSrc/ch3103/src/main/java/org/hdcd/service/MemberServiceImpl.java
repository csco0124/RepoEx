package org.hdcd.service;

import org.hdcd.domain.Member;
import org.hdcd.domain.MemberAuth;
import org.hdcd.repository.MemberAuthRepository;
import org.hdcd.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;
	
	private final MemberAuthRepository memberAuthRepository;
	
	@Transactional
	@Override
	public void register(Member member) throws Exception {
		Member memberEntity = new Member();
		memberEntity.setUserId(member.getUserId());
		memberEntity.setUserPw(member.getUserPw());
		memberEntity.setUserName(member.getUserName());
		
		memberRepository.save(memberEntity);
		
		MemberAuth memberAuthEntity = new MemberAuth();
		memberAuthEntity.setAuth("USER");
		
		memberAuthEntity.setUserNo(memberEntity.getUserNo());
		
		memberAuthRepository.save(memberAuthEntity);
	}
	
}
