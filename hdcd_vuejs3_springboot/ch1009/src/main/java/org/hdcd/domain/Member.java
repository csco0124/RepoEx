package org.hdcd.domain;

import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@ToString
public class Member {
	
	private final String userId;
	private final String password;
	private String userName;

}
