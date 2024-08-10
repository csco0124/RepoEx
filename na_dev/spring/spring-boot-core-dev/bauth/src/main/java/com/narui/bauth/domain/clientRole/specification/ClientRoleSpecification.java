package com.narui.bauth.domain.clientRole.specification;

import com.narui.bauth.domain.clientRole.entity.ClientRoleEntity;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.bauth.global.search.specification.BaseSpecification;

public class ClientRoleSpecification extends BaseSpecification<ClientRoleEntity> {

	private static final long serialVersionUID = 1L;
	
	private String primaryKey = "id";
	//where 절에 조건으로 추가할 컬럼의 변수명(join 테이블이 있으면 해당 entity 내부의 변수명으로 작성)
	private String searchableChk = "^(authority|clientName|registeredClientId|defaultYn|id)$";
	//join할 테이블에서 검색할 컬럼의 변수명
	private String joinChk = "^(clientName)$";
	//entity내에 선언된 join할 entity의 변수명
	private String[] joinTable = {"clientEntity"};

	public ClientRoleSpecification(SearchCriteria searchCriteria) {
		super(searchCriteria);
		this.init(primaryKey, searchableChk, joinChk, joinTable);
	}

}
