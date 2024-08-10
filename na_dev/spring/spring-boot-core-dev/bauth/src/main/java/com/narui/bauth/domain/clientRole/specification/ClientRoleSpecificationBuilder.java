package com.narui.bauth.domain.clientRole.specification;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.narui.bauth.domain.clientRole.entity.ClientRoleEntity;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.bauth.global.search.enumeration.SearchOperation;

public class ClientRoleSpecificationBuilder {
	private final List<SearchCriteria> params;

	public ClientRoleSpecificationBuilder() {
		this.params = new ArrayList<>();
	}
	
	public final ClientRoleSpecificationBuilder with(String key, String operation, Object value) {
		params.add(new SearchCriteria(key, operation, value));
		return this;
	}

	public final ClientRoleSpecificationBuilder with(SearchCriteria searchCriteria) {
		params.add(searchCriteria);
		return this;
	}

	public Specification<ClientRoleEntity> build() {
		if (params.size() == 0) {
			return null;
		}

		Specification<ClientRoleEntity> result = new ClientRoleSpecification(params.get(0));
		for (int idx = 1; idx < params.size(); idx++) {
			SearchCriteria criteria = params.get(idx);
			result = SearchOperation.getDataOption(criteria.getDataOption()) == SearchOperation.ALL
					? Specification.where(result).and(new ClientRoleSpecification(criteria))
					: Specification.where(result).or(new ClientRoleSpecification(criteria));
		}
		return result;
	}
}
