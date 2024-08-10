package com.narui.democlientb.test.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.narui.democlientb.test.dto.TreeDto;
import com.narui.democlientb.test.service.TreeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tree")
public class TreeController {
    private final TreeService treeService;


    @ResponseBody
    @PostMapping("/update")
    public ResponseEntity<Void> updateTree(@RequestBody TreeDto treeDto) throws Exception {
    	treeService.updateTree(treeDto);
    	return ResponseEntity.ok().build();
    }

    @ResponseBody
    @PostMapping("/get")
    public ResponseEntity<TreeDto> getTree(@RequestBody TreeDto treeDto) throws Exception {
    	return ResponseEntity.ok().body(treeService.getTree(treeDto));
    }

}
