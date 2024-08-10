package com.narui.bauth.domain.webauthn.specification;

import org.springframework.data.jpa.domain.Specification;

import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.bauth.global.search.specification.BaseSpecification;

public class AuthTypeSpecification extends BaseSpecification<UserEntity> implements Specification<UserEntity> {

	private static final long serialVersionUID = 1L;

	private String primaryKey = "id";
	//where 절에 조건으로 추가할 컬럼의 변수명(join 테이블이 있으면 해당 entity 내부의 변수명으로 작성)
	private String searchableChk = "^(id|enabled|googleKey|kakaoKey|naverKey|nickname)$";
	//join할 테이블에서 검색할 컬럼의 변수명
	private String joinChk = "^(id)$";
	//entity내에 선언된 join할 entity의 변수명
	private String[] joinTable = {"authenticators"};

	public AuthTypeSpecification(SearchCriteria searchCriteria) {
		super(searchCriteria);
		this.init(primaryKey, searchableChk, joinChk, joinTable);
	}
}