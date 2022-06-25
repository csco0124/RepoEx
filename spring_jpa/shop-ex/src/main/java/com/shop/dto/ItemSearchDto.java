package com.shop.dto;

import com.shop.constant.ItemSellStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemSearchDto {
	private String searchDateType;	// 조회시간 기준 - all : 전체, 1d : 최근 하루, 1w : 최근 일주일, 1m : 최근 한달, 6m : 최근 6개월

	private ItemSellStatus searchSellStatus;	// 상품 판매 상태

	private String searchBy;	// 조회 유형 - itemNm : 상품명, createdBy : 상품 등록자 아이디

	private String searchQuery = "";	// 조회 검색어
}
