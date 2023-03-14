package org.hdcd;

import java.time.LocalDateTime;
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
		member1.setJoinDate(LocalDateTime.now());
		
		System.out.println("###_1 save before");
		memberRepository.save(member1);
		System.out.println("###_1 save after");
		
		Member member2 = new Member();
		member2.setUserId("venus");
		member2.setUserPw("4567");
		member2.setUserName("Olivia");
		member2.setGender(Gender.FEMALE);
		member2.setJoinDate(LocalDateTime.now());
		
		System.out.println("###_2 save before");
		memberRepository.save(member2);
		System.out.println("###_2 save after");
		
		Member member3 = new Member();
		member3.setUserId("mercury");
		member3.setUserPw("9876");
		member3.setUserName("Tyler");
		member3.setGender(Gender.FEMALE);
		member3.setJoinDate(LocalDateTime.now());
		
		System.out.println("###_3 save before");
		memberRepository.save(member3);
		System.out.println("###_3 save after");
		
	}
	
	@Test
	public void testList() {
		System.out.println("###_1 findAll before");
		Iterable<Member> memberList = memberRepository.findAll();
		System.out.println("###_1 findAll after");
		
		System.out.println("###_2 print before");
		for(Member member : memberList) {
			System.out.println(member);
		}
		System.out.println("###_2 print after");
	}
	
	@Test
	public void testRead() {
		System.out.println("###_1 findById before");
		Optional<Member> memberOptional = memberRepository.findById(1L);
		System.out.println("###_1 findById after");
		
		System.out.println("###_2 print before");
		if (memberOptional.isPresent()){
			Member member = memberOptional.get();
			
			System.out.println(member);
		}
		System.out.println("###_2 print after");
	}
	
	@Test
	public void testModify() {
		System.out.println("###_1 findById before");
		Optional<Member> memberOptional = memberRepository.findById(1L);
		System.out.println("###_1 findById after");
		
		if (memberOptional.isPresent()) {
			Member member = memberOptional.get();
			member.setUserName("Alexander");
			
			System.out.println("###_2 save before");
			memberRepository.save(member);
			System.out.println("###_2 save after");
		}
	}
	
	@Test
	public void testRemove() {
		System.out.println("###_1 deleteById before");
		memberRepository.deleteById(1L);
		System.out.println("###_1 deleteById after");
	}
	
}
