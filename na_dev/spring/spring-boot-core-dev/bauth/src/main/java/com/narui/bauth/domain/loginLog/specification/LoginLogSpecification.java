package com.narui.bauth.domain.loginLog.specification;

import com.narui.bauth.domain.loginLog.entity.LoginLogEntity;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.bauth.global.search.specification.BaseSpecification;

public class LoginLogSpecification extends BaseSpecification<LoginLogEntity> {

	private static final long serialVersionUID = 1L;
	
	private String primaryKey = "id";  
	private String searchableChk = "^(createdDate|email|type|statusNum|id)$";
	private String joinChk = null;
	private String[] joinTable = {};

	public LoginLogSpecification(SearchCriteria searchCriteria) {
		super(searchCriteria);    
		this.init(primaryKey, searchableChk, joinChk, joinTable);
	}
}