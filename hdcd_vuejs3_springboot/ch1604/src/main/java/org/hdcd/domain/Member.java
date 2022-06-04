package org.hdcd.domain;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Member {

	private String userId = "hongkd";

	private String password = "1234";
	
	private LocalDate dateOfBirth;
	
}
