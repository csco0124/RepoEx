package org.hdcd.repository;

import org.hdcd.domain.CodeGroup;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CodeGroupRepository extends CrudRepository<CodeGroup, String> {

	@Modifying
	@Query("DELETE FROM CodeDetail cd WHERE cd.codeGroup.groupCode = ?1")
	public int deleteAllCodeDetail(String groupCode);
	
}
