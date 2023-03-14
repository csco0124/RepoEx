package org.hdcd.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@EqualsAndHashCode(of="studentNo")
public class Student {

	private int studentNo;
	private String name;
	
}
