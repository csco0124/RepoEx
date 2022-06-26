package com.shop.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class OrderItem extends BaseEntity {
	@Id
	@GeneratedValue
	@Column(name = "order_item_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "item_id")
	private Item item;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id")
	private Order order;

	private int orderPrice; // 주문가격

	private int count; // 수량
	
	/**
	 * 주문 아이템 객체를 만드는 메서드
	 * @param item
	 * @param count
	 * @return
	 */
	public static OrderItem createOrderItem(Item item, int count) {
		OrderItem orderItem = new OrderItem();
		orderItem.setItem(item);	// 주문상품 세팅
		orderItem.setCount(count);	// 주문수량 세팅
		orderItem.setOrderPrice(item.getPrice());	// 현재 시간 기준으로(실시간으로) 상품 가격을 주문 가격으로 세팅
		item.removeStock(count);	//  상품의 재고수량을 감소시킴
		return orderItem;
	}

	/**
	 * 상품가격과 수량을 곱해서 총 가격을 계산하는 메서드
	 * @return
	 */
	public int getTotalPrice() {
		return orderPrice * count;
	}
	
	/**
	 * 주문 취소시 취소한 수량만큼 상품 재고 증가
	 */
    public void cancel() {
        this.getItem().addStock(count);
    }
}
