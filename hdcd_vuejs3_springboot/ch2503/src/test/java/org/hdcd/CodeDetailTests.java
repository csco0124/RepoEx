package org.hdcd;

import java.util.Optional;

import org.hdcd.domain.CodeDetail;
import org.hdcd.domain.CodeGroup;
import org.hdcd.repository.CodeDetailRepository;
import org.hdcd.repository.CodeGroupRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

@SpringBootTest
@Commit
public class CodeDetailTests {
	
	@Autowired
	CodeGroupRepository codeGroupRepository;

	@Autowired
	CodeDetailRepository codeDetailRepository;

	@Test
	public void testList() {
		Iterable<CodeDetail> codeDetailList = codeDetailRepository.findAll();
		
		for(CodeDetail codeDetail : codeDetailList) {
			System.out.println(codeDetail);
		}
	}
	
	@Test
	public void testRead() {
		Optional<CodeDetail> codeDetailOptional = codeDetailRepository.findById(1L);
		
		if (codeDetailOptional.isPresent()) {
			CodeDetail codeDetail = codeDetailOptional.get();
			
			System.out.println(codeDetail);
		}
	}
	
	@Test
	public void testModify() {
		Optional<CodeDetail> codeDetailOptional = codeDetailRepository.findById(1L);
		
		if (codeDetailOptional.isPresent()) {
			CodeDetail codeDetail = codeDetailOptional.get();
			
			System.out.println(codeDetail);
			
			codeDetail.setCodeName("Architect");
			
			codeDetailRepository.save(codeDetail);
		}
	}
	
	@Test
	public void testRemove() {
		codeDetailRepository.deleteById(1L);
	}
	
	@Test
	public void testRemoveAll() {
		codeDetailRepository.deleteAll();
	}	
	
	@Test
	public void testRegister_X() {
		CodeGroup codeGroup = new CodeGroup();
		codeGroup.setGroupCode("A01");
		codeGroup.setGroupName("job");

		CodeDetail codeDetail1 = new CodeDetail();
		codeDetail1.setCodeValue("00");
		codeDetail1.setCodeName("Developer");
		codeDetail1.setCodeGroup(codeGroup);
		
		codeDetailRepository.save(codeDetail1);
		
		CodeDetail codeDetail2 = new CodeDetail();
		codeDetail2.setCodeValue("01");
		codeDetail2.setCodeName("Designer");
		codeDetail2.setCodeGroup(codeGroup);
		
		codeDetailRepository.save(codeDetail2);
	}
	
	@Test
	public void testRegisterWithCodeGroup() {
		CodeGroup codeGroup = new CodeGroup();
		codeGroup.setGroupCode("A01");
		codeGroup.setGroupName("job");
		
		codeGroupRepository.save(codeGroup);
	
		CodeDetail codeDetail1 = new CodeDetail();
		codeDetail1.setCodeValue("00");
		codeDetail1.setCodeName("Developer");
		codeDetail1.setCodeGroup(codeGroup);
		
		codeDetailRepository.save(codeDetail1);
		
		CodeDetail codeDetail2 = new CodeDetail();
		codeDetail2.setCodeValue("01");
		codeDetail2.setCodeName("Designer");
		codeDetail2.setCodeGroup(codeGroup);
		
		codeDetailRepository.save(codeDetail2);
	}
	
	@Test
	public void testListWithCodeGroup() {
		Iterable<CodeDetail> codeDetailList = codeDetailRepository.findAll();
		
		for(CodeDetail codeDetail : codeDetailList) {
			System.out.println(codeDetail);
			
			CodeGroup codeGroup = codeDetail.getCodeGroup();
			if(codeGroup != null) {
				System.out.println(codeGroup);
			}
		}
	}
	
}
