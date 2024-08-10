package com.narui.bauth.domain.clientAuthority.specification;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.narui.bauth.domain.clientAuthority.entity.ClientAuthorityEntity;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.bauth.global.search.enumeration.SearchOperation;

public class ClientAuthoritySpecificationBuilder {
	
	private final List<SearchCriteria> searchCriteriaList;

	public ClientAuthoritySpecificationBuilder(List<SearchCriteria> searchCriteriaList) {
		this.searchCriteriaList = searchCriteriaList;
	}

	public Specification<ClientAuthorityEntity> build() {
		if (searchCriteriaList.size() == 0) {
			return null;
		}
		
		Specification<ClientAuthorityEntity> result = new ClientAuthoritySpecification(searchCriteriaList.get(0));
		for (int idx = 1; idx < searchCriteriaList.size(); idx++) {
			SearchCriteria criteria = searchCriteriaList.get(idx);
			result = SearchOperation.getDataOption(criteria.getDataOption()) == SearchOperation.ALL
					? Specification.where(result).and(new ClientAuthoritySpecification(criteria))
					: Specification.where(result).or(new ClientAuthoritySpecification(criteria));
		}

		return result;
	}
}
