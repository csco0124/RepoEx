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
import org.springframework.data.domain.Sort;
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
	public void testList01() {
		BooleanBuilder builder = new BooleanBuilder();
		
		QMember member = QMember.member;
		
		builder.and(member.userId.eq("user7"));
	
		Iterable<Member> memberList = memberRepository.findAll(builder);
		
		for(Member m : memberList) {
			System.out.println(m);
		}
	}
	
	@Test
	public void testList02() {
		BooleanBuilder builder = new BooleanBuilder();
		
		QMember member = QMember.member;
		
		builder.and(member.userPw.eq("password8"));
	
		Iterable<Member> memberList = memberRepository.findAll(builder);
		
		for(Member m : memberList) {
			System.out.println(m);
		}
	}
	
	@Test
	public void testList03() {
		BooleanBuilder builder = new BooleanBuilder();
		
		QMember member = QMember.member;
		
		builder.and(member.userId.eq("user7"));
		builder.and(member.userPw.eq("password7"));
	
		Iterable<Member> memberList = memberRepository.findAll(builder);
		
		for(Member m : memberList) {
			System.out.println(m);
		}
	}
	
	@Test
	public void testList04() {
		BooleanBuilder builder = new BooleanBuilder();
		
		QMember member = QMember.member;
		
		builder.and(member.userName.like("%alex%"));
	
		Iterable<Member> memberList = memberRepository.findAll(builder);
		
		for(Member m : memberList) {
			System.out.println(m);
		}
	}
	
	@Test
	public void testList05() {
		BooleanBuilder builder = new BooleanBuilder();
		
		QMember member = QMember.member;
		
		builder.and(member.userNo.gt(0));
	
		Iterable<Member> memberList = memberRepository.findAll(builder);
		
		for(Member m : memberList) {
			System.out.println(m);
		}
	}
	
	@Test
	public void testList08() {
		BooleanBuilder builder = new BooleanBuilder();
		
		QMember member = QMember.member;
		
		builder.and(member.userNo.gt(0));
	
		Pageable pageable = PageRequest.of(0, 10, Direction.DESC, "userNo");
		
		Page<Member> result = memberRepository.findAll(builder, pageable);
		
		System.out.println("PAGE SIZE: " + result.getSize());
		System.out.println("TOTAL PAGES: " + result.getTotalPages());
		System.out.println("TOTAL COUNT: " + result.getTotalElements());
		System.out.println("NEXT: " + result.nextPageable());
		
		List<Member> memberList = result.getContent();
		
		for(Member m : memberList) {
			System.out.println(m);
		}
	}
	
	@Test
	public void testList06() {
		BooleanBuilder builder = new BooleanBuilder();
		
		QMember member = QMember.member;
		
		builder.and(member.userNo.gt(0));
	
		Pageable pageable = PageRequest.of(0, 10);
		
		Page<Member> result = memberRepository.findAll(builder, pageable);
		
		System.out.println("PAGE SIZE: " + result.getSize());
		System.out.println("TOTAL PAGES: " + result.getTotalPages());
		System.out.println("TOTAL COUNT: " + result.getTotalElements());
		System.out.println("NEXT: " + result.nextPageable());
		
		List<Member> memberList = result.getContent();
		
		for(Member m : memberList) {
			System.out.println(m);
		}
	}
	
	@Test
	public void testList07() {
		BooleanBuilder builder = new BooleanBuilder();
		
		QMember member = QMember.member;
		
		builder.and(member.userNo.gt(0));
		
		Iterable<Member> memberList = memberRepository.findAll(builder, Sort.by(Direction.DESC, "userNo"));
				
		for(Member m : memberList) {
			System.out.println(m);
		}
	}
	
}
