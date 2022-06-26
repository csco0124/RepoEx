package com.shop.dto;

import com.shop.entity.OrderItem;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemDto {
	
	// OrderItem 엔티티 객체와 이미지 경로를 받아 멤버변수값 세팅
	public OrderItemDto(OrderItem orderItem, String imgUrl) {
		this.itemNm = orderItem.getItem().getItemNm();
		this.count = orderItem.getCount();
		this.orderPrice = orderItem.getOrderPrice();
		this.imgUrl = imgUrl;
	}

	private String itemNm; // 상품명
	private int count; // 주문 수량

	private int orderPrice; // 주문 금액
	private String imgUrl; // 상품 이미지 경로
}
