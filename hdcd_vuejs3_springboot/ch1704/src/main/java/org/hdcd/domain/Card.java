package org.hdcd.domain;

import java.time.YearMonth;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Card {

	@NotBlank
	private String no;

	@JsonFormat(pattern = "yyyy-MM")
	@Future
	private YearMonth validMonth;

}
