package org.hdcd.domain;

import lombok.Builder;
import lombok.ToString;

@ToString
public class Member {
	
	private String userId;
	private String password;
	private String userName;
	
	@Builder
	public Member(String userId, String password) {
		super();
		this.userId = userId;
		this.password = password;
	}

}
