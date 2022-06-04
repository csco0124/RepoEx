package org.hdcd.domain;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Member {

	private String userId = "hongkd";

	private String password = "1234";
	
	@JsonFormat(pattern="yyyyMMdd")
	private LocalDate dateOfBirth;

}
