package org.hdcd;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.hdcd.domain.Member;
import org.hdcd.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@SpringBootTest
public class MemberTests {

	@Autowired
	MemberRepository memberRepository;

	@Test
	public void testRegister() {
		
		for(int i = 0; i < 10; i++) {
			long userNo = i + 1;			
			Member member = new Member();
			member.setUserId("user" + userNo);
			member.setUserPw("password" + userNo);
			member.setUserName("alex" + userNo);

			memberRepository.save(member);
		}

	}
	
	@Test
	public void testListAll() {
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
	
	@Test
	public void testFindMemberByUserId() {
		List<Member> memberList = memberRepository.findMemberByUserId("user7");
		
		for(Member member : memberList) {
			System.out.println(member);
		}
	}
	
	@Test
	public void testList01() {
		List<Member> memberList = memberRepository.findByUserId("user7");
		
		for(Member member : memberList) {
			System.out.println(member);
		}
	}
	
	@Test
	public void testList02() {
		List<Member> memberList = memberRepository.findByUserPw("password8");
		
		for(Member member : memberList) {
			System.out.println(member);
		}
	}
	
	@Test
	public void testList03() {
		List<Member> memberList = memberRepository.findByUserIdAndUserPw("user7", "password7");
		
		for(Member member : memberList) {
			System.out.println(member);
		}
	}
	
	@Test
	public void testList04() {
		List<Member> memberList = memberRepository.findByUserNameContaining("alex");
		
		for(Member member : memberList) {
			System.out.println(member);
		}
	}
	
	@Test
	public void testList05() {
		Collection<Member> memberList = memberRepository.findByUserNoGreaterThan(0L);
		
		for(Member member : memberList) {
			System.out.println(member);
		}
	}
	
	@Test
	public void testList06() {
		Pageable pageRequest = PageRequest.of(0, 10, Sort.Direction.DESC, "userNo");
		
		Page<Member> page = memberRepository.findByUserNoGreaterThan(0L, pageRequest);
		
		int totalPages = page.getTotalPages();
	
		System.out.println(page);
		System.out.println("totalPages : " + totalPages);
		
		Pageable pageable = page.getPageable();
		
		int pageNumber = pageable.getPageNumber();
		int pageSize = pageable.getPageSize();
		
		System.out.println(pageable);
		System.out.println("pageNumber : " + pageNumber);
		System.out.println("pageSize : " + pageSize);
		
		List<Member> meberList = page.getContent();
		
		for(Member member : meberList) {
			System.out.println(member);
		}
	}
	
	@Test
	public void testList07() {
		Collection<Member> memberList = memberRepository.findByUserNoGreaterThanOrderByUserNoDesc(0L);
		
		for(Member member : memberList) {
			System.out.println(member);
		}
	}
	
	@Test
	public void testList08() {
		Pageable pageRequest = PageRequest.of(0, 10);
		
		List<Member> memberList = memberRepository.findByUserNoGreaterThanOrderByUserNoDesc(0L, pageRequest);
		
		for(Member member : memberList) {
			System.out.println(member);
		}
	}
	
}
