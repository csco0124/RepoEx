package com.narui.bauth.domain.role.specification;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.narui.bauth.domain.role.entity.RoleEntity;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.bauth.global.search.enumeration.SearchOperation;

public class RoleSpecificationBuilder {
	private final List<SearchCriteria> params;

	public RoleSpecificationBuilder() {
		this.params = new ArrayList<>();
	}
	
	public final RoleSpecificationBuilder with(String key, String operation, Object value) {
		params.add(new SearchCriteria(key, operation, value));
		return this;
	}

	public final RoleSpecificationBuilder with(SearchCriteria searchCriteria) {
		params.add(searchCriteria);
		return this;
	}

	public Specification<RoleEntity> build() {
		if (params.size() == 0) {
			return null;
		}

		Specification<RoleEntity> result = new RoleSpecification(params.get(0));
		for (int idx = 1; idx < params.size(); idx++) {
			SearchCriteria criteria = params.get(idx);
			result = SearchOperation.getDataOption(criteria.getDataOption()) == SearchOperation.ALL
					? Specification.where(result).and(new RoleSpecification(criteria))
					: Specification.where(result).or(new RoleSpecification(criteria));
		}
		return result;
	}
}
