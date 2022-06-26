package com.shop.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.util.StringUtils;

import com.shop.dto.OrderDto;
import com.shop.dto.OrderHistDto;
import com.shop.dto.OrderItemDto;
import com.shop.entity.Item;
import com.shop.entity.ItemImg;
import com.shop.entity.Member;
import com.shop.entity.Order;
import com.shop.entity.OrderItem;
import com.shop.repository.ItemImgRepository;
import com.shop.repository.ItemRepository;
import com.shop.repository.MemberRepository;
import com.shop.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {
	private final ItemRepository itemRepository;

	private final MemberRepository memberRepository;

	private final OrderRepository orderRepository;

	private final ItemImgRepository itemImgRepository;

	public Long order(OrderDto orderDto, String email) {
		Item item = itemRepository.findById(orderDto.getItemId()).orElseThrow(EntityNotFoundException::new); // 주문할 상품
																												// 조회

		Member member = memberRepository.findByEmail(email); // (현재 로그인한 회원의) 이메일 정보를 통해 회원정보 조회

		List<OrderItem> orderItemList = new ArrayList<>();
		OrderItem orderItem = OrderItem.createOrderItem(item, orderDto.getCount()); // 주문할 상품 엔티티와 주문 수량을 이용해서 주문상품 엔티티
																					// 생성
		orderItemList.add(orderItem);
		Order order = Order.createOrder(member, orderItemList); // 회원정보와 주문상품 리스트정보로 주문 엔티티 생성
		orderRepository.save(order); // 생성한 주문 엔티티 저장

		return order.getId();
	}

	@Transactional(readOnly = true)
	public Page<OrderHistDto> getOrderList(String email, Pageable pageable) {

		List<Order> orders = orderRepository.findOrders(email, pageable);
		Long totalCount = orderRepository.countOrder(email);

		List<OrderHistDto> orderHistDtos = new ArrayList<>();

		for (Order order : orders) {
			OrderHistDto orderHistDto = new OrderHistDto(order);
			List<OrderItem> orderItems = order.getOrderItems();
			for (OrderItem orderItem : orderItems) {
				ItemImg itemImg = itemImgRepository.findByItemIdAndRepimgYn(orderItem.getItem().getId(), "Y");
				OrderItemDto orderItemDto = new OrderItemDto(orderItem, itemImg.getImgUrl());
				orderHistDto.addOrderItemDto(orderItemDto);
			}

			orderHistDtos.add(orderHistDto);
		}

		return new PageImpl<OrderHistDto>(orderHistDtos, pageable, totalCount);
	}
	
	/**
	 * 파라미터로 들어온 주문건에 대하여, 주문데이터 생성자와 파라미터로 들어온 사용자가 같은지 검사
	 * @param orderId
	 * @param email
	 * @return
	 */
	@Transactional(readOnly = true)
	public boolean validateOrder(Long orderId, String email) {
		Member curMember = memberRepository.findByEmail(email);
		Order order = orderRepository.findById(orderId).orElseThrow(EntityNotFoundException::new);
		Member savedMember = order.getMember();

		if (!StringUtils.equals(curMember.getEmail(), savedMember.getEmail())) {
			return false;
		}

		return true;
	}

	public void cancelOrder(Long orderId) {
		Order order = orderRepository.findById(orderId).orElseThrow(EntityNotFoundException::new);
		order.cancelOrder();	// 주문 취소상태로 변경시, 영속 상태이므로 변경감지기능에 의해서 트랜잭션이 끝날 때 UPDATE 쿼리가 실행됨
	}
}
