package org.hdcd.domain;

import java.util.ArrayList;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@EqualsAndHashCode(of="userNo")
@ToString(exclude = "items")
@Entity
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_no")
	private Long userNo;
	private String userId;
	private String userPw;
	private String userName;
	
	@CreationTimestamp
	private LocalDateTime regDate;
	@UpdateTimestamp
	private LocalDateTime updDate;
	
	@ManyToMany
	@JoinTable(name = "user_item",
			joinColumns = @JoinColumn(name = "user_no"),
			inverseJoinColumns = @JoinColumn(name = "item_no"))
	private List<Item> items = new ArrayList<Item>();
	
}
