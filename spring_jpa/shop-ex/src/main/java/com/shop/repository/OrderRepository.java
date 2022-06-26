package com.shop.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.shop.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	
	/**
	 * 해당 사용자의 주문 데이터를 페이징 조건에 맞춰서 조회
	 * @param email
	 * @param pageable
	 * @return
	 */
	@Query("select o from Order o where o.member.email = :email order by o.orderDate desc")
	List<Order> findOrders(@Param("email") String email, Pageable pageable);

	/**
	 * 해당 사용자의 주문 데이터를 페이징 조건에 맞춰서 조회
	 * @param email
	 * @return
	 */
	@Query("select count(o) from Order o where o.member.email = :email")
	Long countOrder(@Param("email") String email);
}
