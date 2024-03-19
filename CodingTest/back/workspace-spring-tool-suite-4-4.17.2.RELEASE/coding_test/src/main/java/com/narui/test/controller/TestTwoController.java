package com.narui.test.controller;

import java.util.HashMap;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.narui.test.dto.Member;
import com.narui.test.repository.MemberRepository;

@Controller
public class TestTwoController {
	
	@Autowired
	MemberRepository memberRepository;
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@RequestMapping(value="/testTwoSample.do")
	public ModelAndView testOneSample(HttpServletRequest request, @RequestParam HashMap<String, Object> paramMap) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("sample/testTwoSample");
		return mv;
	}
	
	@RequestMapping(value="/codingTwo.do")
	public ModelAndView codingTwo(HttpServletRequest request, @RequestParam HashMap<String, Object> paramMap) throws Exception {
		ModelAndView mv = new ModelAndView();
		List<Member> dataList = memberRepository.findAll();
		mv.addObject("dataList", dataList);
		mv.setViewName("coding/testTwoCoding");
		return mv;
	}

	@PostMapping(value="/saveMember.do")
	public ModelAndView saveMember(@ModelAttribute("Member") Member member) throws Exception {
		ModelAndView mv = new ModelAndView();
		Member mb = new Member();
		
		if(member.getId() != null && !"".equals(member.getId())) {
			mb.setId(Long.parseLong(member.getId().toString()));
		} else {
			throw new IllegalStateException("ID가 입력되지 않았습니다.");
		}
		
		if(member.getName() != null && !"".equals(member.getName())) {
			mb.setName(member.getName().toString());
		}else {
			throw new IllegalStateException("이름이 입력되지 않았습니다.");
		}
		
		if(member.getAge() != null && !"".equals(member.getAge())) {
			mb.setAge(Long.parseLong(member.getAge().toString()));
		}else {
			throw new IllegalStateException("나이가 입력되지 않았습니다.");
		}
		
		if(member.getAddr() != null && !"".equals(member.getAddr())) {
			mb.setAddr(member.getAddr().toString());
		}else {
			throw new IllegalStateException("주소가 입력되지 않았습니다.");
		}
		
		if(member.getPhoneNumber() != null && !"".equals(member.getPhoneNumber())) {
			mb.setPhoneNumber(member.getPhoneNumber().toString());
		}else {
			throw new IllegalStateException("전화번호가 입력되지 않았습니다.");
		}
		
		if(member.getUseYn() != null && !"".equals(member.getUseYn())) {
			mb.setUseYn(member.getUseYn().toString());
		}else {
			throw new IllegalStateException("사용여부가 입력되지 않았습니다.");
		}
		
		/* 코딩영역시작 */
		
		
        
        /* 코딩영역종료 */

		mv.setViewName("coding/testTwoCoding");
		return mv;
	}
	
	
	
}