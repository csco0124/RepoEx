package com.shop.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;
import lombok.Setter;

@EntityListeners(value = { AuditingEntityListener.class })
@MappedSuperclass
@Getter
@Setter
public abstract class BaseTimeEntity {

	@CreatedDate
	@Column(updatable = false)	// 엔티티값이 생성되어 저장시 시간 자동 저장
	private LocalDateTime regTime;

	@LastModifiedDate	// 엔티티값이 변경시 시간 자동 저장
	private LocalDateTime updateTime;
}
