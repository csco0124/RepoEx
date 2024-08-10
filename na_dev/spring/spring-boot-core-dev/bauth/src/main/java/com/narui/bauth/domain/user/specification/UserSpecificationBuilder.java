package com.narui.bauth.domain.user.specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.data.jpa.domain.Specification;

import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.bauth.global.search.enumeration.SearchOperation;

public class UserSpecificationBuilder {
	private final List<SearchCriteria> params;

	public UserSpecificationBuilder() {
		this.params = new ArrayList<>();
	}

	public final UserSpecificationBuilder with(String key, String operation, Object value) {
		params.add(new SearchCriteria(key, operation, value));
		return this;
	}

	public final UserSpecificationBuilder with(SearchCriteria searchCriteria) {
		params.add(searchCriteria);
		return this;
	}

	public Specification<UserEntity> build() {
		
		Specification<UserEntity> defaultResult = new UserSpecification(new SearchCriteria("enabled", "eq", true));
		
		//기본 데이터 설정이 있을 시 true
		boolean haveDefaultResult = !Objects.equals(defaultResult, null);
		
		if (params.size() == 0 && !haveDefaultResult) {
			return null;
		}
		
		Specification<UserEntity> result = haveDefaultResult? defaultResult : new UserSpecification(params.get(0));
		int index = haveDefaultResult? 0 : 1;
		
		for (int idx = index; idx < params.size(); idx++) {
			SearchCriteria criteria = params.get(idx);
			result = SearchOperation.getDataOption(criteria.getDataOption()) == SearchOperation.ALL
					? Specification.where(result).and(new UserSpecification(criteria))
					: Specification.where(result).or(new UserSpecification(criteria));
		}
		return result;
	}
}
