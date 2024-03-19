package com.narui.test.controller;

import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.narui.test.dto.Member;
import com.narui.test.repository.MemberRepository;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class TestOneController {
	
	@Autowired
	MemberRepository memberRepository;
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@RequestMapping(value="/testOneSample.do")
	public ModelAndView testOneSample(HttpServletRequest request, @RequestParam HashMap<String, Object> paramMap) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("sample/testOneSample");
		return mv;
	}
	
	@RequestMapping(value="/testOneCoding.do")
	public ModelAndView testOneCoding(HttpServletRequest request, @RequestParam HashMap<String, Object> paramMap) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("coding/testOneCoding");
		return mv;
	}
	
	@PostMapping(value="/codingOne.do")
	@ResponseBody
	public List<Member> codingOne() {
		List<Member> dataList = memberRepository.findAll();
		return dataList;
	}

	@GetMapping(value="/getMemberList.do")
	@ResponseBody
	public List<Member> getMemberList() {
		List<Member> dataList = memberRepository.findAll();
		return dataList;
	}
 
	@GetMapping(value ="/getMember.do/{id}")
	@ResponseBody
	public Member getMemberById(@PathVariable("id") Long id) {
		return memberRepository.findById(id);
	}
	
	
}