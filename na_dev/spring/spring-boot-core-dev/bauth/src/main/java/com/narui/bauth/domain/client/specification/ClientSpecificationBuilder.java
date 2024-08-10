package com.narui.bauth.domain.client.specification;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.narui.bauth.domain.client.entity.ClientEntity;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.bauth.global.search.enumeration.SearchOperation;

public class ClientSpecificationBuilder {

	private final List<SearchCriteria> params;

	public ClientSpecificationBuilder() {
		this.params = new ArrayList<>();
	}

	public final ClientSpecificationBuilder with(String key, String operation, Object value) {
		params.add(new SearchCriteria(key, operation, value));
		return this;
	}

	public final ClientSpecificationBuilder with(SearchCriteria searchCriteria) {
		params.add(searchCriteria);
		return this;
	}

	public Specification<ClientEntity> build() {
		if (params.size() == 0) {
			return null;
		}

		Specification<ClientEntity> result = new ClientSpecification(params.get(0));
		for (int idx = 1; idx < params.size(); idx++) {
			SearchCriteria criteria = params.get(idx);
			result = SearchOperation.getDataOption(criteria.getDataOption()) == SearchOperation.ALL
					? Specification.where(result).and(new ClientSpecification(criteria))
							: Specification.where(result).or(new ClientSpecification(criteria));
		}
		return result;
	}
}
