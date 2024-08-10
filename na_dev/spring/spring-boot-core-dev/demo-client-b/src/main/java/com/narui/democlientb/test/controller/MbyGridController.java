package com.narui.democlientb.test.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.narui.democlientb.test.dto.MbyGridDto;
import com.narui.democlientb.test.service.MbyGridService;

@Controller
@RequestMapping("/api/mby/grid")
public class MbyGridController {

	private final MbyGridService mbyService;

	public MbyGridController(MbyGridService mbyService) {
		this.mbyService = mbyService;
	}

	// 그리드 데이터 추출
	@GetMapping("/data")
	@ResponseBody
	public List<MbyGridDto> getData(MbyGridDto mbyDto) throws Exception {
		List<MbyGridDto> dataList = mbyService.getData(mbyDto);
		return dataList;
	}

	// 그리드 데이터 추가
	@PostMapping("/data")
	@ResponseBody
	public int insertData(@RequestBody MbyGridDto mbyDto) throws Exception {
		return mbyService.insertData(mbyDto);
	}

	// 그리드 데이터 수정 (셀 단위 수정)
	@PostMapping("/cell-new-data")
	@ResponseBody
	public int cellUpdateData(@RequestBody MbyGridDto mbyDto) throws Exception {
		return mbyService.cellUpdateData(mbyDto);
	}

	// 그리드 데이터 수정 (행 단위 수정)
	@PostMapping("/row-new-data")
	@ResponseBody
	public int rowUpdateData(@RequestBody MbyGridDto mbyDto) throws Exception {
		return mbyService.rowUpdateData(mbyDto);
	}

	// 그리드 데이터 삭제 (DEL_YN ='Y' 업데이트 처리)
	@PostMapping("/data-dy")
	@ResponseBody
	public int deleteData(@RequestBody ArrayList<MbyGridDto> mbyDto) throws Exception {
		return mbyService.deleteData(mbyDto);
	}

}
