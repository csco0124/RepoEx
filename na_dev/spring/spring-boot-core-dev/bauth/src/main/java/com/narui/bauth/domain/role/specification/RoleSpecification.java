package com.narui.bauth.domain.role.specification;

import com.narui.bauth.domain.role.entity.RoleEntity;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.bauth.global.search.specification.BaseSpecification;

public class RoleSpecification extends BaseSpecification<RoleEntity> {

	private static final long serialVersionUID = 1L;
	
	private String primaryKey = "authority";
	private String searchableChk = "^(authority|defaultYn)$";
	private String joinChk = null;
	private String[] joinTable = {};

	public RoleSpecification(SearchCriteria searchCriteria) {
		super(searchCriteria);
		this.init(primaryKey, searchableChk, joinChk, joinTable);
	}

}
