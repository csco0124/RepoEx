package org.hdcd.domain.result;

import lombok.ToString;

@ToString
public class Member {
	
	private final String userId;
	private final String password;
	private String userName;
	
	public Member(String userId, String password, String userName) {
		super();
		this.userId = userId;
		this.password = password;
		this.userName = userName;
	}

}
