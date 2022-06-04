package org.hdcd.domain;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Member {

	private String userId = "hongkd";

	private String password = "1234";
	
	private Address address;

	private List<Card> cardList;

}
