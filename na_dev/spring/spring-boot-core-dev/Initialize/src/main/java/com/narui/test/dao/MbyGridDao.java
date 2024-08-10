package com.narui.test.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.narui.test.dto.MbyGridDto;

@Mapper
public interface MbyGridDao {

	// 그리드 데이터 추출
	public List<MbyGridDto> getData(MbyGridDto mbyDto);
	
	// 그리드 데이터 추가
	public int insertData(MbyGridDto mbyDto);

	// 그리드 데이터 수정 (셀 단위 수정)
	public int cellUpdateData(MbyGridDto mbyDto);
	
	// 그리드 데이터 수정 (행 단위 수정)
	public int rowUpdateData(MbyGridDto mbyDto);

	// 그리드 데이터 삭제 (DEL_YN ='Y' 업데이트 처리)
	public int deleteData(ArrayList<MbyGridDto> mbyDto);

	// 입력 키워드에 맞는 json데이터 불러오기(API-MOCHA)
	public MbyGridDto getJsonData(String data);
	
}
