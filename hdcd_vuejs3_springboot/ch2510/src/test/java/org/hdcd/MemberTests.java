package org.hdcd;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.hdcd.domain.Item;
import org.hdcd.domain.Member;
import org.hdcd.domain.UserItem;
import org.hdcd.domain.UserItemId;
import org.hdcd.repository.ItemRepository;
import org.hdcd.repository.MemberRepository;
import org.hdcd.repository.UserItemRepository;
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
	
	@Autowired
	UserItemRepository userItemRepository;
	
	@Test
	public void testRegister() {
		Item item = new Item();
		item.setItemName("apple");
		item.setPrice(1000);
		
		itemRepository.save(item);
			
		Member member = new Member();
		member.setUserId("jupiter");
		member.setUserPw("1234");
		member.setUserName("Alex");

		memberRepository.save(member);

		UserItem userItem = new UserItem();
		userItem.setMember(member);
		userItem.setItem(item);
		userItem.setAmount(5);
		
		userItemRepository.save(userItem);
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
			
			System.out.println(member);
			
			member.setUserName("Julian");
			
			memberRepository.save(member);
		}
	}
	
	@Test
	public void testRemove() {
		memberRepository.deleteById(1L);
	}
	
	@Transactional
	@Test
	public void testRegisterWithUserItemAtTransactional() {
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
		
		UserItem userItem = new UserItem();
		userItem.setMember(member);
		userItem.setItem(item);
		userItem.setAmount(5);
		
		UserItem userItem2 = new UserItem();
		userItem2.setMember(member);
		userItem2.setItem(item2);
		userItem2.setAmount(10);
		
		member.addUserItem(userItem);
		member.addUserItem(userItem2);
	
		memberRepository.save(member);
	}
	
	@Transactional
	@Test
	public void testListWithUserItemAtTransactional() {
		Iterable<Member> members = memberRepository.findAll();
		
		for(Member member : members) {
			System.out.println(member);
			
			List<UserItem> userItems = member.getUserItems();
			for(UserItem userItem : userItems) {
				System.out.println(userItem);
			}
		}
	}
	
	@Transactional
	@Test
	public void testReadWithUserItemAtTransactional() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		if (memberOptional.isPresent()){
			Member member = memberOptional.get();
			System.out.println(member);
			
			List<UserItem> userItems = member.getUserItems();
			for(UserItem userItem : userItems) {
				System.out.println(userItem);
			}
		}
	}
	
	@Transactional
	@Test
	public void testModifyUserItemAtTransactional() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		if (memberOptional.isPresent()){
			Member member = memberOptional.get();
			
			List<UserItem> items = member.getUserItems();
			UserItem firstUserItem = items.get(0);
			
			System.out.println(firstUserItem);
			
			firstUserItem.setAmount(100);
			
			memberRepository.save(member);
		}
	}
	
	@Transactional
	@Test
	public void testRemoveUserItemAtTransactional() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		if (memberOptional.isPresent()){
			Member member = memberOptional.get();
			
			List<UserItem> userItems = member.getUserItems();
			userItems.remove(0);
			
			memberRepository.save(member);
		}
	}
	
	@Transactional
	@Test
	public void testRemoveUserItemAtTransactional2() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		Member member = null;
		if (memberOptional.isPresent()){
			member = memberOptional.get();
		}
		
		Optional<Item> itemOptional = itemRepository.findById(1L);
		Item item = null;
		if (itemOptional.isPresent()){
			item = itemOptional.get();
		}
		
		UserItemId userItemId = new UserItemId();
		userItemId.setMember(member.getUserNo());
		userItemId.setItem(item.getItemNo());
		
		userItemRepository.deleteById(userItemId);
	}
	
	@Test
	public void testRemoveUserItem() {
		UserItemId userItemId = new UserItemId();
		userItemId.setMember(1L);
		userItemId.setItem(1L);
		
		userItemRepository.deleteById(userItemId);
	}
	
	@Transactional
	@Test
	public void testRemoveUserItemAtTransactional3() {
		Optional<Member> memberOptional = memberRepository.findById(1L);
		
		Member member = null;
		if (memberOptional.isPresent()){
			member = memberOptional.get();
		}
		
		Optional<Item> itemOptional = itemRepository.findById(1L);
		Item item = null;
		if (itemOptional.isPresent()){
			item = itemOptional.get();
		}
		
		UserItem userItem = new UserItem();
		userItem.setMember(member);
		userItem.setItem(item);
		
		userItemRepository.delete(userItem);
	}
	
}
