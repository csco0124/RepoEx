package org.hdcd.repository;

import java.util.Collection;
import java.util.List;

import org.hdcd.domain.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends CrudRepository<Member, Long> {

	@Query("SELECT m FROM Member m WHERE m.userId = ?1")
	public List<Member> getList01(String userId);
	
	@Query("SELECT m FROM Member m WHERE m.userPw = :userPw")
	public List<Member> getList02(@Param("userPw")String userPw);
	
	@Query("SELECT m FROM Member m WHERE m.userId = ?1 AND m.userPw = ?2")
	public List<Member> getList03(String userId, String userPw);
	
	@Query("SELECT m FROM Member m WHERE m.userName LIKE %?1%")
	public List<Member> getList04(String userName);
	
	@Query("SELECT m FROM Member m WHERE m.userNo > 0")
	public Collection<Member> getList05();
	
	@Query("SELECT m FROM Member m WHERE m.userNo > 0")
	public Page<Member> getList06(Pageable pageable);
	
	@Query("SELECT m FROM Member m WHERE m.userNo > 0 ORDER BY m.userNo DESC")
	public Collection<Member> getList07();
	
	@Query("SELECT m FROM Member m WHERE m.userNo > 0 ORDER BY m.userNo DESC")
	public List<Member> getList08(Pageable pageable);
	
	@Query("SELECT m.userNo, m.userId, m.userPw FROM Member m WHERE m.userId = ?1")
	public List<Object[]> getListByUserId(String userId);
	
	@Modifying
	@Query("UPDATE FROM Member m SET m.userName = ?2 WHERE m.userId = ?1 ")
	public int updateMemberNameById(String userId, String userName);
	
	@Modifying
	@Query("DELETE FROM Member m WHERE m.userId = ?1")
	public int deleteMemberById(String userId);
	
}
