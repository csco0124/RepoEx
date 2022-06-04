package org.hdcd.controller;

import java.util.List;

import org.hdcd.domain.Notice;
import org.hdcd.service.NoticeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/notices")
public class NoticeController {
	
	private final NoticeService service;

	@GetMapping("/{noticeNo}")
	public ResponseEntity<Notice> read(@PathVariable("noticeNo") int noticeNo) throws Exception {
		Notice notice = service.read(noticeNo);
			
		return new ResponseEntity<>(notice, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<Notice>> list() throws Exception {
		log.info("list");
		
		return new ResponseEntity<>(service.list(), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Notice> register(@Validated @RequestBody Notice notice) throws Exception {
		log.info("register");
		
		service.register(notice);
		
		log.info("register notice.getNoticeNo() = " + notice.getNoticeNo());
		
		return new ResponseEntity<>(notice, HttpStatus.OK);
	}

	@DeleteMapping("/{noticeNo}")
	public ResponseEntity<Void> remove(@PathVariable("noticeNo") int noticeNo) throws Exception {
		service.remove(noticeNo);

		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

	@PutMapping("/{noticeNo}")
	public ResponseEntity<Void> modify(@PathVariable("noticeNo") int noticeNo, @Validated @RequestBody Notice notice) throws Exception {
		notice.setNoticeNo(noticeNo);
		service.modify(notice);
		
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
}
