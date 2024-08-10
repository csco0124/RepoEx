package com.narui.bauth.domain.client.specification;

import com.narui.bauth.domain.client.entity.ClientEntity;
import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.bauth.global.search.specification.BaseSpecification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class ClientSpecification extends BaseSpecification<ClientEntity> {

	private static final long serialVersionUID = 1L;

	private String primaryKey = "id";
	private String searchableChk = "^(id|clientId|clientName)$";
	private String joinChk = "^(homeUrl|baseUrl)$";
	private String[] joinTable = {"clientSettingInfo"};


	public ClientSpecification(SearchCriteria searchCriteria) {
		super(searchCriteria);
		this.init(primaryKey, searchableChk, joinChk, joinTable);
	}

	@Override
	public Predicate toPredicate(Root<ClientEntity> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
		// TODO Auto-generated method stub
		return super.toPredicate(root, query, cb);
	}

}
