package com.shop.dto;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MainItemDto {

	@QueryProjection // MainItemDto 생성자 : QueryDsl로 결과 조회시 MainItemDto 객체로 바로 받아오도록 설정
	public MainItemDto(Long id, String itemNm, String itemDetail, String imgUrl, Integer price) {
		this.id = id;
		this.itemNm = itemNm;
		this.itemDetail = itemDetail;
		this.imgUrl = imgUrl;
		this.price = price;
	}

	private Long id;

	private String itemNm;

	private String itemDetail;

	private String imgUrl;

	private Integer price;

}