package com.narui.bauth.domain.loginLog.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.narui.bauth.domain.loginLog.entity.LoginLogEntity;

@Component
public class OAuth2LoginLogSpecification {
	
	public static Specification<LoginLogEntity> betweenDatetime(String startDatetime, String endDatetime) {
        return (root, query, CriteriaBuilder) -> CriteriaBuilder.between(root.get("createdDate"), startDatetime, endDatetime);
    }
	
	public static Specification<LoginLogEntity> likeEmail(String email) {
        return (root, query, CriteriaBuilder) -> CriteriaBuilder.like(root.get("email"), '%' + email + '%');
    }
	
	public static Specification<LoginLogEntity> equalsStatusNum(int statusNum) {
        return (root, query, CriteriaBuilder) -> CriteriaBuilder.equal(root.get("statusNum"), statusNum);
    }
	
	public static Specification<LoginLogEntity> equalsType(String type) {
        return (root, query, CriteriaBuilder) -> CriteriaBuilder.equal(root.get("type"), type);
    }
	
}
