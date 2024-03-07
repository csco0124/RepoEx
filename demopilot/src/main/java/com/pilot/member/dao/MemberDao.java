package com.pilot.member.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberDao {
	public Map<String, Object> getCurdate() throws Exception;
	
	public Map<String, Object> getMemberList() throws Exception;
	
	public Map<String, Object> getMember(String id);

	public void insertMember(Map<String, Object> param) throws Exception;
}
