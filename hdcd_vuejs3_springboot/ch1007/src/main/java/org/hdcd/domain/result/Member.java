package org.hdcd.domain.result;

import lombok.ToString;

@ToString
public class Member {
	
	private String userId;
	private String password;
	private String userName;
	
	public Member() {
		super();
	}
	
	public Member(String userId, String password, String userName) {
		super();
		this.userId = userId;
		this.password = password;
		this.userName = userName;
	}
	
}
