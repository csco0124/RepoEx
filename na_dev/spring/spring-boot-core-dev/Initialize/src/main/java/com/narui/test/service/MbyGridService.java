package com.narui.test.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.narui.test.dao.MbyGridDao;
import com.narui.test.dto.MbyGridDto;

@Service
public class MbyGridService {
	
	private final MbyGridDao mbyDao;

	public MbyGridService(MbyGridDao mbyDao) {
		this.mbyDao = mbyDao;
	}

	// 그리드 데이터 추출
	public List<MbyGridDto> getData(MbyGridDto mbyDto) {
		List<MbyGridDto> dataList = mbyDao.getData(mbyDto);
		return dataList;
	}
	
	// 그리드 데이터 추가
	public int insertData(MbyGridDto mbyDto) {
		return mbyDao.insertData(mbyDto);
	}

	// 그리드 데이터 수정 (셀 단위 수정)
	public int cellUpdateData(MbyGridDto mbyDto) {
		return mbyDao.cellUpdateData(mbyDto);
	}

	// 그리드 데이터 수정 (행 단위 수정)
	public int rowUpdateData(MbyGridDto mbyDto) {
		return mbyDao.rowUpdateData(mbyDto);
	}

	// 그리드 데이터 삭제 (DEL_YN ='Y' 업데이트 처리)
	public int deleteData(ArrayList<MbyGridDto> mbyDto) {
		return mbyDao.deleteData(mbyDto);
	}

	// 입력 키워드에 맞는 json데이터 불러오기(API-MOCHA)
	public MbyGridDto getJsonData(String data) {
		return mbyDao.getJsonData(data);
	}

	
}