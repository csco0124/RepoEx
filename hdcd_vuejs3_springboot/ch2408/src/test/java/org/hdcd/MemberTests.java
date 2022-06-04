package org.hdcd;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.hdcd.domain.Card;
import org.hdcd.domain.Member;
import org.hdcd.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

@SpringBootTest
@Commit
public class MemberTests {

	@Autowired
	MemberRepository memberRepository;

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
	public void testList_X() {
		Iterable<Member> members = memberRepository.findAll();
		
		for(Member member : members) {
			System.out.println(member);
		}
	}
	
	@Transactional
	@Test
	public void testListWithCardAtTransactional() {
		Iterable<Member> members = memberRepository.findAll();
		
		for(Member member : members) {
			System.out.println(member);
			List<Card> cardList = member.getCardList();
			for(Card card : cardList) {
				System.out.println(card);
			}
		}
	}
	
	@Transactional
	@Test
	public void testReadAtTransactional() {
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
			
			member.setUserId("mars");
			
			memberRepository.save(member);
		}
	}
	
	@Test
	public void testRemove() {
		memberRepository.deleteById(1L);
	}
	
	@Transactional
	@Test
	public void testRemoveCardAtTransactional() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		if(memberOptional.isPresent()) {
			Member member = memberOptional.get();
			
			member.removeCard(1);
		}
	}
	
	@Test
	public void testRemoveCardAndSave() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		if(memberOptional.isPresent()) {
			Member member = memberOptional.get();
			
			member.removeCard(1);
			
			memberRepository.save(member);
		}
	}
	
	@Test
	public void testRegisterWithCard() {
		Member member1 = new Member();
		member1.setUserId("jupiter");
		member1.setUserPw("1234");
		
		List<Card> cardList = new ArrayList<Card>();
		cardList.add(new Card("1111-2222-3333-4444", "202308"));
		cardList.add(new Card("5555-6666-7777-8888", "202205"));
		cardList.add(new Card("9999-8888-6666-3333", "202310"));
		
		member1.setCardList(cardList);
		
		memberRepository.save(member1);
	}
	
	@Transactional
	@Test
	public void testModifyCardAtTransactional() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		if(memberOptional.isPresent()) {
			Member member = memberOptional.get();
			
			Card card = member.getCard(0);
			card.setValidMonth("202110");
			
			memberRepository.save(member);
		}
	}
	
}
