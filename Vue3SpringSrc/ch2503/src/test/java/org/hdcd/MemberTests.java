package org.hdcd;


import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

import org.hdcd.constant.Gender;
import org.hdcd.domain.Member;
import org.hdcd.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MemberTests {

	@Autowired
	MemberRepository memberRepository;

	@Test
	public void testRegister() {
		Member member1 = new Member();
		member1.setUserId("jupiter");
		member1.setUserPw("1234");
		member1.setUserName("Alex");
		member1.setGender(Gender.MALE);
		member1.setJoinDate(new Date());
		
		memberRepository.save(member1);
		
		Member member2 = new Member();
		member2.setUserId("venus");
		member2.setUserPw("4567");
		member2.setUserName("Olivia");
		member2.setGender(Gender.FEMALE);
		member2.setJoinDate(new Date());
		
		memberRepository.save(member2);
		
		Member member3 = new Member();
		member3.setUserId("mercury");
		member3.setUserPw("9876");
		member3.setUserName("Tyler");
		member3.setGender(Gender.FEMALE);
		member3.setJoinDate(new Date());
		
		memberRepository.save(member3);
		
	}
	
	@Test
	public void testList() {
		Iterable<Member> memberList = memberRepository.findAll();
		
		for(Member member : memberList) {
			System.out.println(member);
		}
	}
	
	@Test
	public void testRead() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		if (memberOptional.isPresent()){
			Member member = memberOptional.get();
			
			System.out.println(member);
		}
	}
	
	@Test
	public void testModify() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		if (memberOptional.isPresent()) {
			Member member = memberOptional.get();
			member.setUserName("Alexander");
			
			memberRepository.save(member);
		}
	}
	
	@Test
	public void testRemove() {
		memberRepository.deleteById(1L);
	}
	
}
