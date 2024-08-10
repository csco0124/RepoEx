package com.narui.democlientb.test.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/tiny")
public class TinyController {
	
	@Value("${tiny.image.upload.path}")
	private String imageUploadPath;
	
	@RequestMapping("/image/upload")
	public String imageUpload(@RequestParam("file") List<MultipartFile> files) throws Exception {
		File folder = new File(imageUploadPath);
		if(!folder.exists()) folder.mkdirs();	// 폴더가 없으면 생성
		
		String fileName = "";
		for (MultipartFile file : files) {
			if (!file.isEmpty()) {
				String originalFilename = file.getOriginalFilename();
				fileName = (UUID.randomUUID().toString())+originalFilename.substring(originalFilename.lastIndexOf("."));
				File newFile = new File(imageUploadPath, fileName);
				file.transferTo(newFile);
			}
		}
		
		return fileName;
        
    }
	
	@GetMapping(value = "/get_image/{imagename}", produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<byte[]> userSearch(@PathVariable("imagename") String imagename) throws Exception {
		InputStream imageStream = new FileInputStream(imageUploadPath + imagename);
		byte[] imageByteArray = IOUtils.toByteArray(imageStream);
		imageStream.close();
		return new ResponseEntity<byte[]>(imageByteArray, HttpStatus.OK);
	}
	
}
