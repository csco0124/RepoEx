package org.hdcd.controller;

import java.util.ArrayList;
import java.util.List;

import org.hdcd.domain.Board;
import org.hdcd.service.BoardService;
import org.hdcd.vo.CodeLabelValue;
import org.hdcd.vo.PageRequestVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/board")
public class BoardController {

	private final BoardService service;

	@GetMapping("/register")
	public void registerForm(Board board, Model model) throws Exception {

	}

	@PostMapping("/register")
	public String register(Board board, RedirectAttributes rttr) throws Exception {
		service.register(board);

		rttr.addFlashAttribute("msg", "등록이 완료되었습니다.");
		
		return "redirect:/board/list";
	}

	@GetMapping("/list")
	public void list(@ModelAttribute("pgrq") PageRequestVO pageRequestVO, Model model) throws Exception {
		model.addAttribute("list", service.list(pageRequestVO));
		
		List<CodeLabelValue> searchTypeCodeValueList = new ArrayList<CodeLabelValue>();
		searchTypeCodeValueList.add(new CodeLabelValue("n", "---"));
		searchTypeCodeValueList.add(new CodeLabelValue("t", "Title"));
		searchTypeCodeValueList.add(new CodeLabelValue("c", "Content"));
		searchTypeCodeValueList.add(new CodeLabelValue("w", "Writer"));
		searchTypeCodeValueList.add(new CodeLabelValue("tc", "Title OR Content"));
		searchTypeCodeValueList.add(new CodeLabelValue("cw", "Content OR Writer"));
		searchTypeCodeValueList.add(new CodeLabelValue("tcw", "Title OR Content OR Writer"));

		model.addAttribute("searchTypeCodeValueList", searchTypeCodeValueList);
	}

	@GetMapping("/read")
	public void read(Long boardNo, Model model) throws Exception {
		model.addAttribute(service.read(boardNo));
	}

	@PostMapping("/remove")
	public String remove(Long boardNo, RedirectAttributes rttr) throws Exception {
		service.remove(boardNo);

		rttr.addFlashAttribute("msg", "삭제가 완료되었습니다.");

		return "redirect:/board/list";
	}

	@GetMapping("/modify")
	public void modifyForm(Long boardNo, Model model) throws Exception {
		model.addAttribute(service.read(boardNo));
	}

	@PostMapping("/modify")
	public String modify(Board board, RedirectAttributes rttr) throws Exception {
		service.modify(board);

		rttr.addFlashAttribute("msg", "수정이 완료되었습니다.");

		return "redirect:/board/list";
	}
	
}
