package org.hdcd.service;

import java.util.List;

import org.hdcd.domain.Item;
import org.hdcd.repository.ItemRepository;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ItemServiceImpl implements ItemService {

	private final ItemRepository repository;

	@Override
	public void regist(Item item) throws Exception {
		repository.save(item);
	}

	@Override
	@Transactional(readOnly = true)
	public Item read(Long itemId) throws Exception {
		return repository.getOne(itemId);
	}

	@Override
	public void modify(Item item) throws Exception {
		Item itemEntity = repository.getOne(item.getItemId());

		itemEntity.setItemName(item.getItemName());
		itemEntity.setPrice(item.getPrice());
		itemEntity.setDescription(item.getDescription());
		itemEntity.setPictureUrl(item.getPictureUrl());
		itemEntity.setPictureUrl2(item.getPictureUrl2());
		
		repository.save(itemEntity);
	}

	@Override
	public void remove(Long itemId) throws Exception {
		repository.deleteById(itemId);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Item> list() throws Exception {
		return repository.findAll(Sort.by(Direction.DESC, "itemId"));
	}

	@Override
	public String getPicture(Long itemId) throws Exception {
		Item item = repository.getOne(itemId);
		return item.getPictureUrl();
	}

	@Override
	public String getPicture2(Long itemId) throws Exception {
		Item item = repository.getOne(itemId);
		return item.getPictureUrl2();
	}

}
