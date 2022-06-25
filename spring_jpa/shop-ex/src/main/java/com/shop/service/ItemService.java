package com.shop.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.shop.dto.ItemFormDto;
import com.shop.dto.ItemImgDto;
import com.shop.dto.ItemSearchDto;
import com.shop.dto.MainItemDto;
import com.shop.entity.Item;
import com.shop.entity.ItemImg;
import com.shop.repository.ItemImgRepository;
import com.shop.repository.ItemRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {
	private final ItemRepository itemRepository;

	private final ItemImgService itemImgService;

	private final ItemImgRepository itemImgRepository;

	public Long saveItem(ItemFormDto itemFormDto, List<MultipartFile> itemImgFileList) throws Exception {

		// 상품 등록
		Item item = itemFormDto.createItem();
		itemRepository.save(item);

		// 이미지 등록
		for (int i = 0; i < itemImgFileList.size(); i++) {
			ItemImg itemImg = new ItemImg();
			itemImg.setItem(item);

			if (i == 0) {
				itemImg.setRepimgYn("Y");
			} else {
				itemImg.setRepimgYn("N");
			}
			itemImgService.saveItemImg(itemImg, itemImgFileList.get(i));
		}

		return item.getId();
	}
	
	/**
	 * 아이템 상세
	 * @param itemId
	 * @return
	 */
	@Transactional(readOnly = true)
	public ItemFormDto getItemDtl(Long itemId) {
		List<ItemImg> itemImgList = itemImgRepository.findByItemIdOrderByIdAsc(itemId);	// id 오름차순으로 가져오기
		List<ItemImgDto> itemImgDtoList = new ArrayList<>();
		for (ItemImg itemImg : itemImgList) {
			ItemImgDto itemImgDto = ItemImgDto.of(itemImg);		// 화면에 보여주기 위해 itemImg 내용을 itemImgDto로 복사
			itemImgDtoList.add(itemImgDto);
		}

		Item item = itemRepository.findById(itemId).orElseThrow(EntityNotFoundException::new);
		ItemFormDto itemFormDto = ItemFormDto.of(item);	// 화면에 보여주기 위해 item 내용을 itemFormDto로 복사
		itemFormDto.setItemImgDtoList(itemImgDtoList);
		return itemFormDto;
	}
	
	/**
	 * 상품 수정
	 * @param itemFormDto
	 * @param itemImgFileList
	 * @return
	 * @throws Exception
	 */
    public Long updateItem(ItemFormDto itemFormDto, List<MultipartFile> itemImgFileList) throws Exception{
        Item item = itemRepository.findById(itemFormDto.getId()).orElseThrow(EntityNotFoundException::new);
        item.updateItem(itemFormDto);
        List<Long> itemImgIds = itemFormDto.getItemImgIds();

        //이미지 등록
        for(int i=0;i<itemImgFileList.size();i++){
            itemImgService.updateItemImg(itemImgIds.get(i), itemImgFileList.get(i));
        }

        return item.getId();
    }
    
    @Transactional(readOnly = true)
    public Page<Item> getAdminItemPage(ItemSearchDto itemSearchDto, Pageable pageable){
        return itemRepository.getAdminItemPage(itemSearchDto, pageable);
    }
    
    @Transactional(readOnly = true)
    public Page<MainItemDto> getMainItemPage(ItemSearchDto itemSearchDto, Pageable pageable){
        return itemRepository.getMainItemPage(itemSearchDto, pageable);
    }
}
