package com.narui.test.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.narui.test.dto.MbyBoardDto;
import com.narui.test.service.MbyBoardService;

@Controller
@RequestMapping("/api/mby/board")
public class MbyBoardController {

	private final MbyBoardService mbyService;

	public MbyBoardController(MbyBoardService mbyService) {
		this.mbyService = mbyService;
	}
	
	String filePath = "C:/Users/sist/Desktop/63제안준비소스백업/테스트이미지폴더";

	// 게시글 불러오기
	@GetMapping("/data")
	@ResponseBody
	public List<MbyBoardDto> getData() throws Exception {
		List<MbyBoardDto> titleList = mbyService.getData();
		return titleList;
	}

	// 게시글 글쓰기
	@ResponseBody
	@PostMapping(value = "/data", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public int insertData(@ModelAttribute MbyBoardDto mbyDto, @RequestPart("file") MultipartFile file)
			throws Exception {
		String fileName = file.getOriginalFilename();
		filePath = "C:/Users/sist/Desktop/63제안준비소스백업/테스트이미지폴더";
		mbyDto.setImageName(fileName);

		if (fileName != null && !fileName.isEmpty()) {
			File directory = new File(filePath);
			if (!directory.exists()) {
				directory.mkdirs(); // 폴더가 존재하지 않으면 생성
			}
			File targetFile = new File(directory, fileName);
			file.transferTo(targetFile);
		}
		return mbyService.insertData(mbyDto);
	}
	
	// 작성된 게시글에 맞는 이미지 파일 불러오기
	@GetMapping(value = "/image/{imagename}", produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<byte[]> getImage(@PathVariable("imagename") String imagename) throws Exception {
		InputStream imageStream = new FileInputStream(filePath + '/' + imagename);
		byte[] imageByteArray = IOUtils.toByteArray(imageStream);
		imageStream.close();
		return new ResponseEntity<byte[]>(imageByteArray, HttpStatus.OK);
	}

}
