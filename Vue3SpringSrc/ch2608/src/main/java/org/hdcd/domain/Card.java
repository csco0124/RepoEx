package org.hdcd.domain;

import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of= {"cardNo", "validMonth"})
@ToString
@Embeddable
public class Card {

	private String cardNo;
	private String validMonth;

}
