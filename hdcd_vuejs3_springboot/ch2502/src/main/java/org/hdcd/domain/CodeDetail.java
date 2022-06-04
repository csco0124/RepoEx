package org.hdcd.domain;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@EqualsAndHashCode(of="codeDetailNo")
@ToString
@Entity
public class CodeDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codeDetailNo;
	
	private String codeValue;
	
	private String codeName;
	private int sortSeq;
	private String useYn = "Y";
	
	@CreationTimestamp
	private LocalDateTime regDate;
	@UpdateTimestamp
	private LocalDateTime updDate;

}
