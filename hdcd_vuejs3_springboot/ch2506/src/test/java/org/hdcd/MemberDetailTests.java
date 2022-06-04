package org.hdcd;

import java.util.Optional;

import javax.transaction.Transactional;

import org.hdcd.domain.Member;
import org.hdcd.domain.MemberDetail;
import org.hdcd.repository.MemberDetailRepository;
import org.hdcd.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

@SpringBootTest
@Commit
public class MemberDetailTests {
	
	@Autowired
	MemberRepository memberRepository;

	@Autowired
	MemberDetailRepository memberDetailRepository;
	
	@Test
	public void testRegister() {
		MemberDetail memberDetail1 = new MemberDetail();
		memberDetail1.setUserName("Alex");
		memberDetail1.setEmail("jupiter@onnote.net");
		
		memberDetailRepository.save(memberDetail1);
		
		MemberDetail memberDetail2 = new MemberDetail();
		memberDetail2.setUserName("Olivia");
		memberDetail2.setEmail("venus@onnote.net");
		
		memberDetailRepository.save(memberDetail2);
		
		MemberDetail memberDetail3 = new MemberDetail();
		memberDetail3.setUserName("Tyler");
		memberDetail3.setEmail("mercury@onnote.net");
		
		memberDetailRepository.save(memberDetail3);
	}
	
	@Test
	public void testList() {
		Iterable<MemberDetail> memberDetails = memberDetailRepository.findAll();
		
		for(MemberDetail memberDetail : memberDetails) {
			System.out.println(memberDetail);
		}
	}
	
	@Transactional
	@Test
	public void testRegisterWithMember() {
		Long userNo = 1L;
		
		Member member1 = new Member();
		member1.setUserNo(userNo);
		member1.setUserId("jupiter");
		member1.setUserPw("1234");
		
		MemberDetail memberDetail1 = new MemberDetail();
		memberDetail1.setUserName("Alex");
		memberDetail1.setEmail("jupiter@onnote.net");
		
		member1.setMemberDetail(memberDetail1);
		
		memberRepository.save(member1);
		
		memberDetailRepository.save(memberDetail1);
	}
	
	@Test
	public void testModify() {
		Optional<MemberDetail> memberDetailOptional = memberDetailRepository.findById(1L);
		
		if (memberDetailOptional.isPresent()) {
			MemberDetail memberDetail = memberDetailOptional.get();
			memberDetail.setUserName("Alexander");
			
			memberDetailRepository.save(memberDetail);
		}
	}
	
	@Test
	public void testRead() {
		Optional<MemberDetail> memberDetailOptional = memberDetailRepository.findById(1L);
		
		if (memberDetailOptional.isPresent()){
			MemberDetail memberDetail = memberDetailOptional.get();
			
			System.out.println(memberDetail);
		}
	}
	
	@Test
	public void testRemove() {
		memberDetailRepository.deleteById(1L);
	}
	
}
