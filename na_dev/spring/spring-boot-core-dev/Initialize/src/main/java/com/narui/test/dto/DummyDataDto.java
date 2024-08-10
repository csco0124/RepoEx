package com.narui.test.dto;

import lombok.Data;

@Data
public class DummyDataDto extends CommDto {
	public String uid; // uid?
	public String dataPath; // 경로
	public String jsonData; // JSON 데이터
	public String dataInfo; // 데이터 정보
	public String statusCode; // 상태코드 (200,404,500 등등)
	public String delayTime; // 지연시간 (0~9 사이로)
	public String methodType; // GET or POST
	
}
