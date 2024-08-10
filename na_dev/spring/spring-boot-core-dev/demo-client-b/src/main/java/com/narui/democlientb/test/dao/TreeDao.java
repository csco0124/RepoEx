package com.narui.democlientb.test.dao;

import org.apache.ibatis.annotations.Mapper;

import com.narui.democlientb.test.dto.TreeDto;

@Mapper
public interface TreeDao {

    public void updateTree (TreeDto treeDto) throws Exception;

    public TreeDto getTree(TreeDto treeDto) throws Exception;
}
