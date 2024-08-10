package com.narui.test.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MbyBoardDto extends CommDto {

	/**
	 * 테이블 컬럼 property
	 */
	public int uid; // UID
	public String title; // title 데이터
	public String content; // content 데이터
	public String imageName; // 이미지 파일명

}
