package com.narui.test.controller;

import com.narui.test.dto.TreeDto;
import com.narui.test.service.TreeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
