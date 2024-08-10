package com.narui.test.dao;

import com.narui.test.dto.TreeDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TreeDao {

    public void updateTree (TreeDto treeDto) throws Exception;

    public TreeDto getTree(TreeDto treeDto) throws Exception;
}
