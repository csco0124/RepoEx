package org.hdcd.domain;

import java.util.ArrayList;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@EqualsAndHashCode(of="userNo")
@ToString(exclude = "userItems")
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
	
	@OneToMany(mappedBy = "member", cascade= CascadeType.ALL)
	private List<UserItem> userItems = new ArrayList<UserItem>();

	public void addUserItem(UserItem userItem) {
		userItems.add(userItem);
	}
	
	public void removeUserItem(UserItem userItem) {
		userItems.remove(userItem);
	}
}
