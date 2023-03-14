package org.hdcd;

import java.util.Optional;

import org.hdcd.domain.CodeGroup;
import org.hdcd.repository.CodeGroupRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CodeGroupTests {

	@Autowired
	CodeGroupRepository codeGroupRepository;

	@Test
	public void testList() {
		Iterable<CodeGroup> codeGroupList = codeGroupRepository.findAll();
		
		for(CodeGroup codeGroup : codeGroupList) {
			System.out.println(codeGroup);
		}
	}
	
	@Test
	public void testModify() {
		Optional<CodeGroup> codeGroupOptional = codeGroupRepository.findById("A01");
		
		if (codeGroupOptional.isPresent()) {
			CodeGroup codeGroup = codeGroupOptional.get();
			codeGroup.setGroupName("license");
			
			codeGroupRepository.save(codeGroup);
		}
	}
	
	@Test
	public void testRead() {
		Optional<CodeGroup> codeGroupOptional = codeGroupRepository.findById("A01");
		
		if (codeGroupOptional.isPresent()){
			CodeGroup codeGroup = codeGroupOptional.get();
			
			System.out.println(codeGroup);
		}
	}
	
	@Test
	public void testRegister() {
		CodeGroup codeGroup = new CodeGroup();
		codeGroup.setGroupCode("A01");
		codeGroup.setGroupName("job");
	
		codeGroupRepository.save(codeGroup);
		
		codeGroup = new CodeGroup();
		codeGroup.setGroupCode("A02");
		codeGroup.setGroupName("hobby");
	
		codeGroupRepository.save(codeGroup);
	}
	
	@Test
	public void testRemove() {
		codeGroupRepository.deleteById("A01");
	}
	
}
