package org.hdcd.domain;

import java.io.Serializable;

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
@EqualsAndHashCode(of= {"member", "item"})
@ToString
public class UserItemId implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long member;
	private Long item;
	
}
