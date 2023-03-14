package org.hdcd;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.hdcd.domain.Item;
import org.hdcd.domain.Member;
import org.hdcd.repository.ItemRepository;
import org.hdcd.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

@Commit
@SpringBootTest
public class ItemTests {

	@Autowired
	ItemRepository itemRepository;
	
	@Autowired
	MemberRepository memberRepository;

	@Test
	public void testRegister() {
		Member member = new Member();
		member.setUserId("jupiter");
		member.setUserPw("1234");
		member.setUserName("Alex");
		
		memberRepository.save(member);
		
		Member member2 = new Member();
		member2.setUserId("venus");
		member2.setUserPw("4567");
		member2.setUserName("Olivia");
		
		memberRepository.save(member2);
		
		Item item = new Item();
		item.setItemName("apple");
		item.setPrice(1000);
		
		itemRepository.save(item);
	}
	
	@Test
	public void testList() {
		Iterable<Item> items = itemRepository.findAll();
		
		for(Item item : items) {
			System.out.println(item);
		}
	}
	
	@Test
	public void testRead() {
		Optional<Item> itemOptional = itemRepository.findById(1L);
		
		if (itemOptional.isPresent()){
			Item item = itemOptional.get();
			
			System.out.println(item);
		}
	}
	
	@Test
	public void testModify() {
		Optional<Item> itemOptional = itemRepository.findById(1L);
		
		if (itemOptional.isPresent()){
			Item item = itemOptional.get();
			
			item.setItemName("banana");
			
			itemRepository.save(item);
		}
	}
	
	@Test
	public void testRemove_X() {
		itemRepository.deleteById(1L);
	}
	
	@Transactional
	@Test
	public void testReadWithMemberAtTransactional() {
		Optional<Item> itemOptional = itemRepository.findById(1L);
		
		if (itemOptional.isPresent()) {
			Item item = itemOptional.get();
			
			System.out.println(item);
			
			List<Member> members = item.getMembers();
			for(Member member : members) {
				System.out.println(member);
			}
		}
	}
	
	@Transactional
	@Test
	public void testListWithMemberAtTransactional() {
		Iterable<Item> items = itemRepository.findAll();
		
		for(Item item : items) {
			System.out.println(item);
			
			List<Member> members = item.getMembers();
			for(Member member : members) {
				System.out.println(member);
			}
		}
	}
	
	@Transactional
	@Test
	public void testRegisterWithMemberAtTransactional() {		
		Member member = new Member();
		member.setUserId("jupiter");
		member.setUserPw("1234");
		member.setUserName("Alex");
		
		memberRepository.save(member);
		
		Member member2 = new Member();
		member2.setUserId("venus");
		member2.setUserPw("4567");
		member2.setUserName("Olivia");
		
		memberRepository.save(member2);
		
		Item item = new Item();
		item.setItemName("apple");
		item.setPrice(1000);
		
		item.addMember(member);
		item.addMember(member2);
		
		itemRepository.save(item);
	}
	
	@Transactional
	@Test
	public void testModifyMemberAtTransactional() {
		Optional<Item> itemOptional = itemRepository.findById(1L);
		
		if (itemOptional.isPresent()) {
			Item item = itemOptional.get();
			
			List<Member> members = item.getMembers();
			Member firstMember = members.get(0);
			
			System.out.println(firstMember);
			
			firstMember.setUserName("Julian");
			
			itemRepository.save(item);
		}
	}
	
	@Transactional
	@Test
	public void testRemoveMemberAtTransactional() {
		Optional<Item> itemOptional = itemRepository.findById(1L);
		
		if (itemOptional.isPresent()) {
			Item item = itemOptional.get();
			
			Member memberForRemove = new Member();
			memberForRemove.setUserNo(1L);
			
			item.removeMember(memberForRemove);
			
			itemRepository.save(item);
		}
	}
	
}
