package org.hdcd.domain;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Address {

	@NotBlank
	private String postCode;

	@NotBlank
	private String location;

}
