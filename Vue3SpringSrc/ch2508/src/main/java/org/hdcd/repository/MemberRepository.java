package org.hdcd.repository;

import java.util.Collection;
import java.util.List;

import org.hdcd.domain.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface MemberRepository extends CrudRepository<Member, Long>, CustomMemberRepository {

	public List<Member> findByUserId(String userId);
	
	public List<Member> findByUserPw(String userPw);
	
	public List<Member> findByUserIdAndUserPw(String userId, String userPw);
	
	public List<Member> findByUserNameContaining(String userName);
	
	public Collection<Member> findByUserNoGreaterThan(Long userNo);
	
	public Page<Member> findByUserNoGreaterThan(Long userNo, Pageable pageable);
	
	public Collection<Member> findByUserNoGreaterThanOrderByUserNoDesc(Long userNo);
	
	public List<Member> findByUserNoGreaterThanOrderByUserNoDesc(Long userNo, Pageable pageable);
	
}
