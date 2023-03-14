package org.hdcd.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomMemberRepository {

	public Page<Object[]> getSearchPage(String type, String keyword, Pageable page);
	
}
