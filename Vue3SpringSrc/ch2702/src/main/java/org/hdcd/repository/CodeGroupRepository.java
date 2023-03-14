package org.hdcd.repository;

import org.hdcd.domain.CodeGroup;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CodeGroupRepository extends CrudRepository<CodeGroup, String> {

	@Modifying
	@Query("DELETE FROM CodeDetail cd WHERE cd.codeDetailNo = ?1")
	public int deleteCodeDetail(Long codeDetailNo);
	
	@Modifying
	@Query("UPDATE FROM CodeDetail cd SET cd.codeName = ?2 WHERE cd.codeDetailNo = ?1 ")
	public int updateCodeDetailName(Long codeDetailNo, String codeName);
	
}
