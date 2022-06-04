package org.hdcd;

import java.util.Optional;

import org.hdcd.domain.Address;
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
	public void testList() {
		Iterable<Member> members = memberRepository.findAll();
		
		for(Member member : members) {
			System.out.println(member);
		}
	}
	
	@Test
	public void testRead() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		if(memberOptional.isPresent()) {
			Member member = memberOptional.get();
			
			System.out.println(member);
		}
	}
	
	@Test
	public void testModify() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		if(memberOptional.isPresent()) {
			Member member = memberOptional.get();
			
			System.out.println(member);
			
			member.setUserId("mars");
			
			memberRepository.save(member);
		}
	}
	
	@Test
	public void testModifyAddress() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		if(memberOptional.isPresent()) {
			Member member = memberOptional.get();
			
			System.out.println(member);
			
			Address address = member.getAddress();
			
			address.setLocation("London");
			
			memberRepository.save(member);
		}
	}
	
	@Test
	public void testRemove() {
		memberRepository.deleteById(1L);
	}
	
	@Test
	public void testRemoveAddress() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		if(memberOptional.isPresent()) {
			Member member = memberOptional.get();
			
			System.out.println(member);
			
			member.setAddress(null);
			
			memberRepository.save(member);
		}
	}
	
	@Test
	public void testRegister() {
		Member member1 = new Member();
		member1.setUserId("jupiter");
		member1.setUserPw("1234");
		
		memberRepository.save(member1);
		
		Member member2 = new Member();
		member2.setUserId("venus");
		member2.setUserPw("4567");
		
		memberRepository.save(member2);
		
		Member member3 = new Member();
		member3.setUserId("mercury");
		member3.setUserPw("9876");
		
		memberRepository.save(member3);
	}
	
	@Test
	public void testRegisterWithAddress() {
		Member member1 = new Member();
		member1.setUserId("jupiter");
		member1.setUserPw("1234");
		
		Address address = new Address("111-222", "Seoul");
		member1.setAddress(address);
		
		memberRepository.save(member1);
	}
	
	@Test
	public void testListWithAddress() {
		Iterable<Member> members = memberRepository.findAll();
		
		for(Member member : members) {
			System.out.println(member);
			
			System.out.println(member.getAddress());
		}
	}
	
}
