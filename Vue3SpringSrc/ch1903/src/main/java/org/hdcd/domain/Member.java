package org.hdcd.domain;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Member {

	@NotBlank
	private String userId;

	@NotBlank
	private String password;

	@NotBlank
	@Size(max = 3)
	private String userName;

	@Email
	private String email;

	private String gender;

	@Past
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate dateOfBirth;

}
