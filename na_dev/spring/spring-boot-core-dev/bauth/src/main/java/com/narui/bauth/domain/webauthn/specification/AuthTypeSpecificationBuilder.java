package com.narui.bauth.domain.webauthn.specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.data.jpa.domain.Specification;

import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.bauth.global.search.enumeration.SearchOperation;

public class AuthTypeSpecificationBuilder {

	private final List<SearchCriteria> params;

	public AuthTypeSpecificationBuilder() {
		this.params = new ArrayList<>();
	}

	public final AuthTypeSpecificationBuilder with(String key, String operation, Object value) {
		params.add(new SearchCriteria(key, operation, value));
		return this;
	}

	public final AuthTypeSpecificationBuilder with(SearchCriteria searchCriteria) {
		params.add(searchCriteria);
		return this;
	}

	public Specification<UserEntity> build() {

		Specification<UserEntity> defaultResult = null;
		
		//기본 데이터 설정------------------------------------------------------
		List<Specification<UserEntity>> authOrList = new ArrayList<Specification<UserEntity>>();
		authOrList.add(new AuthTypeSpecification(new SearchCriteria("kakaoKey", "nn", "")));
		authOrList.add(new AuthTypeSpecification(new SearchCriteria("naverKey", "nn", "")));
		authOrList.add(new AuthTypeSpecification(new SearchCriteria("googleKey", "nn", "")));
		authOrList.add(new AuthTypeSpecification(new SearchCriteria("id", "nn", "")));
		Specification<UserEntity> enableSpec = new AuthTypeSpecification(new SearchCriteria("enabled", "eq", true));
		
		defaultResult = Specification.anyOf(authOrList).and(enableSpec);
		//-------------------------------------------------------------------
		
		//기본 데이터 설정이 있을 시 true
		boolean haveDefaultResult = !Objects.equals(defaultResult, null);
		
		if (params.size() == 0 && !haveDefaultResult) {
			return null;
		}
		
		Specification<UserEntity> result = haveDefaultResult? defaultResult : new AuthTypeSpecification(params.get(0));
		int index = haveDefaultResult? 0 : 1;
		
		for (int idx = index; idx < params.size(); idx++) {
			SearchCriteria criteria = params.get(idx);
			result = SearchOperation.getDataOption(criteria.getDataOption()) == SearchOperation.ALL
					? Specification.where(result).and(new AuthTypeSpecification(criteria))
					: Specification.where(result).or(new AuthTypeSpecification(criteria));
		}
		return result;
	}
}
