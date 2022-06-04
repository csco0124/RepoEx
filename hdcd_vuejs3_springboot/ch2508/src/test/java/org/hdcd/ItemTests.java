package org.hdcd;

import java.util.Optional;

import org.hdcd.domain.Item;
import org.hdcd.repository.ItemRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ItemTests {

	@Autowired
	ItemRepository itemRepository;

	@Test
	public void testRegister() {
		Item item = new Item();
		item.setItemName("apple");
		item.setPrice(1000);
		
		itemRepository.save(item);
		
		item = new Item();
		item.setItemName("orange");
		item.setPrice(2000);
		
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
	public void testRemove() {
		itemRepository.deleteById(1L);
	}
	
}
