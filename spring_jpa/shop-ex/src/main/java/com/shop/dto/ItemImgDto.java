package com.shop.dto;

import org.modelmapper.ModelMapper;

import com.shop.entity.ItemImg;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemImgDto {
	private Long id;

	private String imgName;

	private String oriImgName;

	private String imgUrl;

	private String repImgYn;

	private static ModelMapper modelMapper = new ModelMapper();		// modelMapper 사용을 위해 멤버 변수로 ModelMapper객체를 추가

	/* 
	 * 1. Entity의 ItemImg 객체를 파라미터로 받아서 ItemImg 객체의 자료형과 멤버변수의 이름이 같을 때 ItemImgDto로 값을 복사해서 반환함.
	 * 2. static으로 선언하여 ItemImgDto객체를 생성하지 않아도 호출할 수 있도록 함
	 */
	public static ItemImgDto of(ItemImg itemImg) {
		return modelMapper.map(itemImg, ItemImgDto.class);
	}
}
