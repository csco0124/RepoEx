package org.hdcd;

import java.util.Optional;

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

@SpringBootTest
public class UserItemTests {
	
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
		userItem.setAmount(10);
		
		userItemRepository.save(userItem);
	}
	
	@Test
	public void testList() {
		Iterable<UserItem> userItems = userItemRepository.findAll();
		
		for(UserItem userItem : userItems) {
			System.out.println(userItem);
		}
	}
	
	@Test
	public void testRead() {
		UserItemId userItemId = new UserItemId();
		userItemId.setMember(1L);
		userItemId.setItem(1L);
		
		Optional<UserItem> userItemOptional = userItemRepository.findById(userItemId);
		
		if (userItemOptional.isPresent()){
			UserItem userItem = userItemOptional.get();
			
			System.out.println(userItem);
		}
	}
	
	@Test
	public void testModify() {
		UserItemId userItemId = new UserItemId();
		userItemId.setMember(1L);
		userItemId.setItem(1L);
		
		Optional<UserItem> userItemOptional = userItemRepository.findById(userItemId);
		
		if (userItemOptional.isPresent()){
			UserItem userItem = userItemOptional.get();
			
			userItem.setAmount(100);
			
			userItemRepository.save(userItem);
		}
	}
	
	@Test
	public void testRemove() {
		UserItemId userItemId = new UserItemId();
		userItemId.setMember(1L);
		userItemId.setItem(1L);
		
		userItemRepository.deleteById(userItemId);
	}
	
	@Test
	public void testReadWithMemberAndItem() {
		UserItemId userItemId = new UserItemId();
		userItemId.setMember(1L);
		userItemId.setItem(1L);
		
		Optional<UserItem> userItemOptional = userItemRepository.findById(userItemId);
		
		if (userItemOptional.isPresent()){
			UserItem userItem = userItemOptional.get();
			
			System.out.println(userItem);
			
			System.out.println(userItem.getMember());
			System.out.println(userItem.getItem());
		}
	}
	
	@Test
	public void testListWithMemberAndItem() {
		Iterable<UserItem> userItems = userItemRepository.findAll();
		
		for(UserItem userItem : userItems) {
			System.out.println(userItem);
			
			System.out.println(userItem.getMember());
			System.out.println(userItem.getItem());
		}
	}
	
}
