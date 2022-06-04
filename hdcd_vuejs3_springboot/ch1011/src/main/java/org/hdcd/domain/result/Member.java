package org.hdcd.domain.result;

import lombok.ToString;

@ToString
public class Member {
	
	private String userId;
	private String password;
	private String userName;
	
	public Member(String userId, String password) {
		super();
		this.userId = userId;
		this.password = password;
	}
	
	public static MemberBuilder builder() {
		return new MemberBuilder();
	}
	
	public static class MemberBuilder {
		
		private String userId;
		private String password;
		
		private MemberBuilder() {}
		
		public MemberBuilder userId(String userId) {
			this.userId = userId;
			return this;
		}
		
		public MemberBuilder password(String password) {
			this.password = password;
			return this;
		}
		
		public Member build() {
			return new Member(userId, password);
		}

	}
	
}
