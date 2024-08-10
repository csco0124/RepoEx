package com.narui.bauth.domain.authority.enumeration;

import lombok.Getter;

@Getter
public enum AuthorityEnum {
	AUTHORITY_USER("USER"),
	AUTHORITY_ADMIN("ADMIN"),
	AUTHORITY_PRE_AUTH("PRE_AUTH");
	
	private final String authority;
	
	private AuthorityEnum(String authority) {
		this.authority = authority;
	}
}
