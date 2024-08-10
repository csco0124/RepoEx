package com.narui.bauth.domain.user.specification;

import org.springframework.data.jpa.domain.Specification;

import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.bauth.global.search.specification.BaseSpecification;

public class UserSpecification extends BaseSpecification<UserEntity> implements Specification<UserEntity> {

	private static final long serialVersionUID = 1L;
	
	private String primaryKey = "id";
	private String searchableChk = "^(id|email|phone|nickname|enabled)$";
	private String joinChk = "^(id|phone)$";
	private String[] joinTable = {"phone"};

	public UserSpecification(SearchCriteria searchCriteria) {
		super(searchCriteria);
		this.init(primaryKey, searchableChk, joinChk, joinTable);
	}

}
