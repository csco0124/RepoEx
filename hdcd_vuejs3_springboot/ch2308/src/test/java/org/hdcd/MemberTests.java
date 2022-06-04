package org.hdcd;

import java.util.List;
import java.util.Optional;

import org.hdcd.domain.Member;
import org.hdcd.domain.QMember;
import org.hdcd.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;

import com.querydsl.core.BooleanBuilder;

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
	
	@Test
	public void testGetSearchPage() {
		BooleanBuilder builder = new BooleanBuilder();
		
		QMember board = QMember.member;
		
		builder.and(board.userNo.gt(0));
	
		Pageable pageable = PageRequest.of(0, 10, Direction.DESC, "userNo");
		
		Page<Object[]> result = memberRepository.getSearchPage("name", "alex", pageable);
		
		System.out.println("PAGE SIZE: " + result.getSize());
		System.out.println("TOTAL PAGES: " + result.getTotalPages());
		System.out.println("TOTAL COUNT: " + result.getTotalElements());
		System.out.println("NEXT: " + result.nextPageable());
		
		List<Object[]> list = result.getContent();
		
		for(Object[] b : list) {
			System.out.println(b[0]);
			System.out.println(b[1]);
			System.out.println(b[2]);
			System.out.println(b[3]);
			System.out.println(b[4]);
		}
	}
	
}
