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
	public void testList() {
		Iterable<CodeGroup> codeGroupList = codeGroupRepository.findAll();
		
		for(CodeGroup codeGroup : codeGroupList) {
			System.out.println(codeGroup);
		}
	}
	
	@Test
	public void testListByJoinQuery() {
		List<Object[]> list = codeGroupRepository.getList();
		
		for(Object[] record : list) {
			System.out.println(record[0] + " : " + record[1] + " : " + record[2] + " : " + record[3] + " : " + record[4]);
		}
	}
	
	@Test
	public void testListByJoinQuery2() {
		List<Object[]> list = codeGroupRepository.getList2();
		
		for(Object[] record : list) {
			System.out.println(record[0] + " : " + record[1] + " : " + record[2] + " : " + record[3] + " : " + record[4]);
		}
	}
	
	@Test
	public void testListByJoinQuery3() {
		List<Object[]> list = codeGroupRepository.getList3();
		
		for(Object[] record : list) {
			System.out.println(record[0] + " : " + record[1] + " : " + record[2] + " : " + record[3] + " : " + record[4]);
		}
	}
	
	@Test
	public void testListByJoinQuery4() {
		List<Object[]> list = codeGroupRepository.getList4();
		
		for(Object[] record : list) {
			System.out.println(record[0] + " : " + record[1] + " : " + record[2] + " : " + record[3] + " : " + record[4]);
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
	
	@Transactional
	@Test
	public void testModifyCodeDetailByQueryAtTransactional() {
		Long codeDetailId = 2L;
		String codeName = "Architect";
		
		int count = codeGroupRepository.updateCodeDetailName(codeDetailId, codeName);
		
		System.out.println("after updated. count : " + count);
	}
	
	@Transactional
	@Test
	public void testModifyCodeDetailAtTransactional() {
		Optional<CodeGroup> codeGroupOptional = codeGroupRepository.findById("A01");
		
		if (codeGroupOptional.isPresent()) {
			CodeGroup codeGroup = codeGroupOptional.get();
			
			System.out.println("codeGroup : " + codeGroup);
			
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
				codeDetailForSearch.setCodeGroup(codeGroup);
				
				codeDetails.add(codeDetailForSearch);
				
				codeGroupRepository.save(codeGroup);
			}
		}
	}
	
	@Transactional
	@Test
	public void testModifyCodeDetailAtTransactional2() {
		Optional<CodeGroup> codeGroupOptional = codeGroupRepository.findById("A01");
		
		if (codeGroupOptional.isPresent()) {
			CodeGroup codeGroup = codeGroupOptional.get();
			
			System.out.println("codeGroup : " + codeGroup);
			
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
	public void testRead() {
		Optional<CodeGroup> codeGroupOptional = codeGroupRepository.findById("A01");
		
		if (codeGroupOptional.isPresent()){
			CodeGroup codeGroup = codeGroupOptional.get();
			
			System.out.println(codeGroup);
		}
	}
	
	@Transactional
	@Test
	public void testReadWithCodeDetailAtTransactional() {
		Optional<CodeGroup> codeGroupOptional = codeGroupRepository.findById("A01");
		
		if (codeGroupOptional.isPresent()){
			CodeGroup codeGroup = codeGroupOptional.get();
			
			List<CodeDetail> codeDetails = codeGroup.getCodeDetails();
			
			System.out.println("codeDetails : " + codeDetails);
			System.out.println("codeDetails.size() : " + codeDetails.size());
		}
	}
	
	@Test
	public void testRegister() {
		CodeGroup codeGroup = new CodeGroup();
		codeGroup.setGroupCode("A01");
		codeGroup.setGroupName("job");
	
		codeGroupRepository.save(codeGroup);
	}
	
	@Test
	public void testRegisterWithCodeDetail() {
		CodeGroup codeGroup = new CodeGroup();
		codeGroup.setGroupCode("A01");
		codeGroup.setGroupName("job");
	
		CodeDetail codeDetail = new CodeDetail();
		codeDetail.setCodeGroup(codeGroup);
		codeDetail.setCodeValue("00");
		codeDetail.setCodeName("Developer");
		
		CodeDetail codeDetail2 = new CodeDetail();
		codeDetail2.setCodeGroup(codeGroup);
		codeDetail2.setCodeValue("01");
		codeDetail2.setCodeName("Designer");
		
		codeGroup.setCodeDetails(Arrays.asList(codeDetail, codeDetail2));
		
		codeGroupRepository.save(codeGroup);
	}
	
	@Test
	public void testRemove() {
		codeGroupRepository.deleteById("A01");
	}
	
	@Transactional
	@Test
	public void testRemoveCodeDetailAtTransactional() {
		Optional<CodeGroup> codeGroupOptional = codeGroupRepository.findById("A01");
		
		if (codeGroupOptional.isPresent()){
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
	
	@Transactional
	@Test
	public void testRemoveCodeDetailByQueryAtTransactional() {
		Long codeDetailId = 1L;
		
		int count = codeGroupRepository.deleteCodeDetail(codeDetailId);
		
		System.out.println("after removed. count : " + count);
	}
	
	@Transactional
	@Test
	public void testModifyCodeDetailAtTransactional3() {
		Optional<CodeGroup> codeGroupOptional = codeGroupRepository.findById("A01");
		
		if (codeGroupOptional.isPresent()) {
			CodeGroup codeGroup = codeGroupOptional.get();
			
			System.out.println("codeGroup : " + codeGroup);
			
			List<CodeDetail> codeDetails = codeGroup.getCodeDetails();
			
			System.out.println("codeDetails : " + codeDetails);
			System.out.println("codeDetails.size() : " + codeDetails.size());
	
			CodeDetail codeDetailForSearch = new CodeDetail();
			codeDetailForSearch.setCodeDetailNo(1L);
			
			int idx = codeDetails.indexOf(codeDetailForSearch);
			
			System.out.println("idx = " + idx);
	
			if (idx > -1) {
				CodeDetail targetCodeDetail = codeDetails.get(idx);
				
				System.out.println("targetCodeDetail : " + targetCodeDetail);
				
				targetCodeDetail.setCodeName("Architect");
				
				codeGroupRepository.save(codeGroup);
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
