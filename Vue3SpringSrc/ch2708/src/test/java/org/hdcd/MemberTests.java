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
public class MemberTests {

	@Autowired
	MemberRepository memberRepository;
	
	@Autowired
	ItemRepository itemRepository;

	@Test
	public void testRegister() {
		Item item = new Item();
		item.setItemName("apple");
		item.setPrice(1000);
		
		itemRepository.save(item);
		
		Item item2 = new Item();
		item2.setItemName("orange");
		item2.setPrice(2000);
		
		itemRepository.save(item2);
			
		Member member = new Member();
		member.setUserId("jupiter");
		member.setUserPw("1234");
		member.setUserName("Alex");
		
		memberRepository.save(member);
	}
	
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
		
		if (memberOptional.isPresent()){
			Member member = memberOptional.get();
			
			System.out.println(member);
		}
	}
	
	@Test
	public void testModify() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		if (memberOptional.isPresent()){
			Member member = memberOptional.get();
			
			member.setUserName("Julian");
			
			memberRepository.save(member);
		}
	}
	
	@Test
	public void testRemove() {
		memberRepository.deleteById(1L);
	}
	
	@Test
	public void testRegisterWithItem() {
		Item item = new Item();
		item.setItemName("apple");
		item.setPrice(1000);
		
		itemRepository.save(item);
		
		Item item2 = new Item();
		item2.setItemName("orange");
		item2.setPrice(2000);
		
		itemRepository.save(item2);
			
		Member member = new Member();
		member.setUserId("jupiter");
		member.setUserPw("1234");
		member.setUserName("Alex");
		
		member.getItems().add(item);
		member.getItems().add(item2);
	
		memberRepository.save(member);
	}
	
	@Transactional
	@Test
	public void testListWithItemAtTransactional() {
		Iterable<Member> members = memberRepository.findAll();
		
		for(Member member : members) {
			System.out.println(member);
			
			List<Item> items = member.getItems();
			for(Item item : items) {
				System.out.println(item);
			}
		}
	}
	
	@Transactional
	@Test
	public void testReadWithItemAtTransactional() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		if (memberOptional.isPresent()){
			Member member = memberOptional.get();
			System.out.println(member);
			
			List<Item> items = member.getItems();
			for(Item item : items) {
				System.out.println(item);
			}
		}
	}
	
	@Transactional
	@Test
	public void testModifyItemAtTransactional() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		if (memberOptional.isPresent()){
			Member member = memberOptional.get();
			
			List<Item> items = member.getItems();
			Item firstItem = items.get(0);
			
			System.out.println(firstItem);
			
			firstItem.setItemName("banana");
			
			memberRepository.save(member);
		}
	}
	
	@Transactional
	@Test
	public void testRemoveItemAtTransactional() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		if (memberOptional.isPresent()){
			Member member = memberOptional.get();
			
			List<Item> items = member.getItems();
			items.remove(0);
			
			memberRepository.save(member);
		}
	}
	
}
