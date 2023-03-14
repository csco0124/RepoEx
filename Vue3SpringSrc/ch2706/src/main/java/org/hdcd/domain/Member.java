package org.hdcd.domain;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@EqualsAndHashCode(of="userNo")
@ToString(exclude="memberDetail")
@Entity
public class Member {

	@Id
	@Column(name = "user_no")
	private Long userNo;
	
	private String userId;
	private String userPw;
	
	@CreationTimestamp
	private LocalDateTime regDate;
	@UpdateTimestamp
	private LocalDateTime updDate;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="user_no")
	private MemberDetail memberDetail;
	
}
