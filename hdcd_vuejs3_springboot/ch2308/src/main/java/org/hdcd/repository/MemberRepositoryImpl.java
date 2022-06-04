package org.hdcd.repository;

import java.util.ArrayList;
import java.util.List;

import org.hdcd.domain.Member;
import org.hdcd.domain.QMember;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.JPQLQuery;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class MemberRepositoryImpl extends QuerydslRepositorySupport implements CustomMemberRepository {

	public MemberRepositoryImpl() {
		super(Member.class);
	}

	@Override
	public Page<Object[]> getSearchPage(String type, String keyword, Pageable page) {
		log.info("====================================");
		log.info("TYPE: " + type);
		log.info("KEYWORD: " + keyword);
		log.info("PAGE: " + page);
		log.info("====================================");
		
		QMember member = QMember.member;
		
		JPQLQuery<Member> query = from(member);
		
		JPQLQuery<Tuple> tuple = query.select(member.userNo, member.userId, member.userPw, member.userName, member.regDate);
		tuple.where(member.userNo.gt(0L));
		
		if(type != null){
			switch (type.toLowerCase()) {
				case "id":
					tuple.where(member.userId.like("%" + keyword +"%"));
					break;
				case "name":
					tuple.where(member.userName.like("%" + keyword +"%"));
					break;
			}
		}
		
		tuple.orderBy(member.userNo.desc());

		tuple.offset(page.getOffset());
		tuple.limit(page.getPageSize());

		List<Tuple> tupleList = tuple.fetch();

		List<Object[]> resultList = new ArrayList<>();
		
		for(Tuple t : tupleList) {
			resultList.add(t.toArray());
		}

		long total = tuple.fetchCount();

		return new PageImpl<>(resultList, page, total);
	}
}
