package org.hdcd.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@EqualsAndHashCode(of="userAuthNo")
@ToString
@Entity
@Table(name="member_auth")
public class MemberAuth {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userAuthNo;
	
	@Column(length = 6)
	private String auth;

	private Long userNo;
	
}
