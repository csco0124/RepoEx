package org.hdcd.repository;

import org.hdcd.domain.Member;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

public interface MemberRepository extends CrudRepository<Member, Long>, QuerydslPredicateExecutor<Member> {

}
