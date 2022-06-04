package org.hdcd.service;

import java.util.List;

import org.hdcd.domain.CodeGroup;

public interface CodeGroupService {

	public void register(CodeGroup codeClass) throws Exception;

	public CodeGroup read(String classCode) throws Exception;

	public void modify(CodeGroup codeClass) throws Exception;

	public void remove(String classCode) throws Exception;

	public List<CodeGroup> list() throws Exception;
	
}
