package org.hdcd.repository;

import java.util.List;

import org.hdcd.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long>{

	public List<Member> findByUserId(String userId);
	
}
