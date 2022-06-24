package com.shop.service;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.util.StringUtils;

import com.shop.entity.ItemImg;
import com.shop.repository.ItemImgRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemImgService {

	@Value("${itemImgLocation}")
	private String itemImgLocation;

	private final ItemImgRepository itemImgRepository;

	private final FileService fileService;

	public void saveItemImg(ItemImg itemImg, MultipartFile itemImgFile) throws Exception {
		String oriImgName = itemImgFile.getOriginalFilename();
		String imgName = "";
		String imgUrl = "";

		// 파일 업로드
		if (!StringUtils.isEmpty(oriImgName)) {
			imgName = fileService.uploadFile(itemImgLocation, oriImgName, itemImgFile.getBytes());
			imgUrl = "/images/item/" + imgName;
		}

		// 상품 이미지 정보 저장
		itemImg.updateItemImg(oriImgName, imgName, imgUrl);
		itemImgRepository.save(itemImg);
	}

	/**
	 * 아이템 이미지 수정
	 * 
	 * @param itemImgId
	 * @param itemImgFile
	 * @throws Exception
	 */
	public void updateItemImg(Long itemImgId, MultipartFile itemImgFile) throws Exception {
		if (!itemImgFile.isEmpty()) {
			ItemImg savedItemImg = itemImgRepository.findById(itemImgId).orElseThrow(EntityNotFoundException::new);

			// 기존 이미지 파일 삭제
			if (!StringUtils.isEmpty(savedItemImg.getImgName())) {
				fileService.deleteFile(itemImgLocation + "/" + savedItemImg.getImgName());
			}

			String oriImgName = itemImgFile.getOriginalFilename();
			String imgName = fileService.uploadFile(itemImgLocation, oriImgName, itemImgFile.getBytes());
			String imgUrl = "/images/item/" + imgName;
			savedItemImg.updateItemImg(oriImgName, imgName, imgUrl);
			
			// ItemImg 엔티티는 현재 영속 상태이므로 save로직을 호출하지 않아도 트랜잭션이 끝날 때 update 쿼리가 실행됨
		}
	}

}
