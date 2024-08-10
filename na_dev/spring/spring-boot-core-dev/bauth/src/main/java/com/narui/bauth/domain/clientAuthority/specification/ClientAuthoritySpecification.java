package com.narui.bauth.domain.clientAuthority.specification;

import com.narui.bauth.domain.clientAuthority.entity.ClientAuthorityEntity;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.bauth.global.search.specification.BaseSpecification;

public class ClientAuthoritySpecification extends BaseSpecification<ClientAuthorityEntity>{

	private static final long serialVersionUID = 1L;
	
	private String primaryKey = "id";
	private String searchableChk = "^(id|authority)$";
	private String joinChk = "^(authority)$";
	private String[] joinTable = {"clientRoleEntity"};
	
	public ClientAuthoritySpecification(SearchCriteria searchCriteria) {
		super(searchCriteria);
		this.init(primaryKey, searchableChk, joinChk, joinTable);
	}

}
