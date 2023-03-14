package org.hdcd.domain;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Member {

	@NotBlank
	private String userId;
	private String password;

	@NotBlank
	@Size(max = 3)
	private String userName;

	private String email;

	private String gender;

}
