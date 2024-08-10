package com.narui.democlientb.test.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.narui.democlientb.test.dao.TreeDao;
import com.narui.democlientb.test.dto.TreeDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class TreeService {
    private final TreeDao treeDao;

    public void updateTree(TreeDto treeDto) throws Exception {
    	treeDao.updateTree(treeDto);
    }

    public TreeDto getTree(TreeDto treeDto) throws Exception {
        return treeDao.getTree(treeDto);
    }
}
