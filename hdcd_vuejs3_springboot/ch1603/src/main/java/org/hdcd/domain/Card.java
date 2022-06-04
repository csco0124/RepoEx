package org.hdcd.domain;

import java.time.YearMonth;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Card {

	private String no;
	
	private YearMonth validMonth;

}
