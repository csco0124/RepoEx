package com.narui.bauth.domain.loginLog.specification;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;

import com.narui.bauth.domain.loginLog.entity.LoginLogEntity;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.bauth.global.search.enumeration.SearchOperation;

public class LoginLogSpecificationBuilder {

	private final List<SearchCriteria> params;

	public LoginLogSpecificationBuilder() {
		this.params = new ArrayList<>();
	}

	public final LoginLogSpecificationBuilder with(String key, String operation, Object value) {
		params.add(new SearchCriteria(key, operation, value));
		return this;
	}

	public final LoginLogSpecificationBuilder with(SearchCriteria searchCriteria) {
		params.add(searchCriteria);
		return this;
	}

	public Specification<LoginLogEntity> build() {
		if (params.size() == 0) {
			return null;
		}

		Specification<LoginLogEntity> result = new LoginLogSpecification(params.get(0));
		for (int idx = 1; idx < params.size(); idx++) {
			SearchCriteria criteria = params.get(idx);
			result = SearchOperation.getDataOption(criteria.getDataOption()) == SearchOperation.ALL
					? Specification.where(result).and(new LoginLogSpecification(criteria))
					: Specification.where(result).or(new LoginLogSpecification(criteria));
		}
		return result;
	}
}
