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
public class MbyGridDto extends CommDto {
	
	/**
	 * 테이블 컬럼 property
	 */
	public int uid; // UID
	public String dataPath; // 데이터 경로
	public String jsonData; // json 데이터
	public String dataInfo; // 데이터 정보
	public String statusCode; // 상태 코드
	public String delayTime; // 지연 시간
	public String methodType; // 메소드 유형
	
	/**
	 * 그리드 업데이트 기능을 위한 property
	 */
	public String column; // 그리드에서 수정하고자 하는 셀 데이터가 속해있는 컬럼
	public String updateCellData; // 그리드에서 수정하고자 기입한 셀 데이터
	
	/**
	 * 페이징 기능을 위한 property
	 */
	public int startRowNum; // 보여줄 데이터 시작지점
	public int howMuchNum; // 보여줄 데이터의 행 수
}
