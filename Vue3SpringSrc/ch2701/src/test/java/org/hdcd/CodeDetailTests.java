package org.hdcd;

import java.util.Optional;

import org.hdcd.domain.CodeDetail;
import org.hdcd.repository.CodeDetailRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CodeDetailTests {

	@Autowired
	CodeDetailRepository codeDetailRepository;

	@Test
	public void testRegister() {
		CodeDetail codeDetail = new CodeDetail();
		codeDetail.setGroupCode("A01");
		codeDetail.setCodeValue("00");
		codeDetail.setCodeName("Developer");
		
		codeDetailRepository.save(codeDetail);
		
		codeDetail = new CodeDetail();
		codeDetail.setGroupCode("A01");
		codeDetail.setCodeValue("01");
		codeDetail.setCodeName("Designer");
		
		codeDetailRepository.save(codeDetail);
	}
	
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
		
		if (codeDetailOptional.isPresent()){
			CodeDetail codeDetail = codeDetailOptional.get();
			
			System.out.println(codeDetail);
		}
	}
	
	@Test
	public void testModify() {
		Optional<CodeDetail> codeDetailOptional = codeDetailRepository.findById(1L);
		
		if (codeDetailOptional.isPresent()) {
			CodeDetail codeDetail = codeDetailOptional.get();
			codeDetail.setCodeName("Architect");
			
			codeDetailRepository.save(codeDetail);
		}
	}
	
	@Test
	public void testRemove() {
		codeDetailRepository.deleteById(1L);
	}
	
}
