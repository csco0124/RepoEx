package org.hdcd;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.hdcd.domain.CodeDetail;
import org.hdcd.domain.CodeGroup;
import org.hdcd.repository.CodeGroupRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

@SpringBootTest
@Commit
public class CodeGroupTests {

	@Autowired
	CodeGroupRepository codeGroupRepository;

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
	public void testRegisterWithCodeDetail() {
		CodeGroup codeGroup = new CodeGroup();
		codeGroup.setGroupCode("A01");
		codeGroup.setGroupName("job");

		CodeDetail codeDetail = new CodeDetail();
		codeDetail.setCodeValue("00");
		codeDetail.setCodeName("Developer");
		
		CodeDetail codeDetail2 = new CodeDetail();
		codeDetail2.setCodeValue("01");
		codeDetail2.setCodeName("Designer");
		
		codeGroup.setCodeDetails(Arrays.asList(codeDetail, codeDetail2));
		
		codeGroupRepository.save(codeGroup);
	}
	
	@Test
	public void testList() {
		Iterable<CodeGroup> codeGroupList = codeGroupRepository.findAll();
		
		for(CodeGroup codeGroup : codeGroupList) {
			System.out.println(codeGroup);
		}
	}
	
	@Test
	public void testRead() {
		Optional<CodeGroup> codeGroupOptional = codeGroupRepository.findById("A01");
		
		if (codeGroupOptional.isPresent()) {
			CodeGroup codeGroup = codeGroupOptional.get();
			
			System.out.println(codeGroup);
		}
	}
	
	@Test
	public void testRemove() {
		codeGroupRepository.deleteById("A01");
	}
	
	@Transactional
	@Test
	public void testModifyCodeDetailAtTransactional() {
		Optional<CodeGroup> codeGroupOptional = codeGroupRepository.findById("A01");
		
		if (codeGroupOptional.isPresent()) {
			CodeGroup codeGroup = codeGroupOptional.get();
			
			List<CodeDetail> codeDetails = codeGroup.getCodeDetails();
			
			System.out.println("codeDetails : " + codeDetails);
			System.out.println("codeDetails.size() : " + codeDetails.size());

			CodeDetail codeDetailForSearch = new CodeDetail();
			codeDetailForSearch.setCodeDetailNo(1L);
			
			int idx = codeDetails.indexOf(codeDetailForSearch);
			
			System.out.println("idx = " + idx);
	
			if (idx > -1) {
				codeDetails.remove(idx);
				
				codeDetailForSearch.setCodeName("Architect");
				
				codeDetails.add(codeDetailForSearch);
				
				codeGroup.setCodeDetails(codeDetails);
				
				codeGroupRepository.save(codeGroup);
			}
		}
	}
	
	@Transactional
	@Test
	public void testReadWithCodeDetailAtTransactional() {
		Optional<CodeGroup> codeGroupOptional = codeGroupRepository.findById("A01");
		
		if (codeGroupOptional.isPresent()) {
			CodeGroup codeGroup = codeGroupOptional.get();
			
			List<CodeDetail> codeDetails = codeGroup.getCodeDetails();
			
			for(CodeDetail codeDetail : codeDetails) {
				System.out.println(codeDetail);
			}
		}
	}
	
	@Transactional
	@Test
	public void testRemoveCodeDetailAtTransactional() {
		Optional<CodeGroup> codeGroupOptional = codeGroupRepository.findById("A01");
		
		if (codeGroupOptional.isPresent()) {
			CodeGroup codeGroup = codeGroupOptional.get();
			
			List<CodeDetail> codeDetails = codeGroup.getCodeDetails();
			
			System.out.println("codeDetails : " + codeDetails);
			System.out.println("codeDetails.size() : " + codeDetails.size());
	
			CodeDetail codeDetailForSearch = new CodeDetail();
			codeDetailForSearch.setCodeDetailNo(1L);
			
			int idx = codeDetails.indexOf(codeDetailForSearch);
			
			System.out.println("idx = " + idx);
	
			if (idx > -1) {
				codeDetails.remove(idx);
				
				System.out.println("after removed. codeDetails.size() : " + codeDetails.size());
				
				codeGroup.setCodeDetails(codeDetails);
				
				codeGroupRepository.save(codeGroup);
			}	
		}
	}
	
	@Test
	public void testRemoveCodeDetailByQuery_X() {
		Long codeDetailId = 1L;
		
		int count = codeGroupRepository.deleteCodeDetail(codeDetailId);
		
		System.out.println("after removed. count : " + count);
	}
	
	@Transactional
	@Test
	public void testRemoveCodeDetailByQueryAtTransactional() {
		Long codeDetailId = 1L;
		
		int count = codeGroupRepository.deleteCodeDetail(codeDetailId);
		
		System.out.println("after removed. count : " + count);
	}
	
	@Transactional
	@Test
	public void testModifyCodeDetailAtTransactional2() {
		Optional<CodeGroup> codeGroupOptional = codeGroupRepository.findById("A01");
		
		if (codeGroupOptional.isPresent()) {
			CodeGroup codeGroup = codeGroupOptional.get();
			
			List<CodeDetail> codeDetails = codeGroup.getCodeDetails();
			
			System.out.println("codeDetails : " + codeDetails);
			System.out.println("codeDetails.size() : " + codeDetails.size());
			
			CodeDetail targetCodeDetail = codeDetails.get(0);
			
			System.out.println("targetCodeDetail : " + targetCodeDetail);
			
			targetCodeDetail.setCodeName("Architect");
			
			codeGroupRepository.save(codeGroup);
		}
	}
	
	@Test
	public void testModifyCodeDetailByQuery_X() {
		Long codeDetailId = 1L;
		String codeName = "Architect";
		
		int count = codeGroupRepository.updateCodeDetailName(codeDetailId, codeName);
		
		System.out.println("after updated. count : " + count);
	}
	
	@Transactional
	@Test
	public void testModifyCodeDetailByQueryAtTransactional() {
		Long codeDetailId = 1L;
		String codeName = "Architect";
		
		int count = codeGroupRepository.updateCodeDetailName(codeDetailId, codeName);
		
		System.out.println("after updated. count : " + count);
	}
	
	@Test
	public void testListWithCodeDetail_X() {
		Iterable<CodeGroup> codeGroupList = codeGroupRepository.findAll();
		
		for(CodeGroup codeGroup : codeGroupList) {
			System.out.println(codeGroup);
			
			Iterable<CodeDetail> codeDetailList = codeGroup.getCodeDetails();
			
			for(CodeDetail codeDetail : codeDetailList) {
				System.out.println(codeDetail);
			}
		}
	}
	
	@Transactional
	@Test
	public void testListWithCodeDetailAtTransactional() {
		Iterable<CodeGroup> codeGroupList = codeGroupRepository.findAll();
		
		for(CodeGroup codeGroup : codeGroupList) {
			System.out.println(codeGroup);
			
			Iterable<CodeDetail> codeDetailList = codeGroup.getCodeDetails();
			
			for(CodeDetail codeDetail : codeDetailList) {
				System.out.println(codeDetail);
			}
		}
	}
	
	@Test
	public void testModify() {
		Optional<CodeGroup> codeGroupOptional = codeGroupRepository.findById("A01");
		
		if (codeGroupOptional.isPresent()) {
			CodeGroup codeGroup = codeGroupOptional.get();
			
			System.out.println("codeGroup : " + codeGroup);
			
			codeGroup.setGroupName("hobby");
			
			codeGroupRepository.save(codeGroup);
		}
	}
	
}
