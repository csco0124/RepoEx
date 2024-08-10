package com.narui.bauth.global.search.specification;

import java.util.Objects;
import java.util.regex.Pattern;

import org.springframework.data.jpa.domain.Specification;

import com.narui.bauth.global.search.dto.SearchCriteria;
import com.narui.bauth.global.search.enumeration.SearchOperation;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class BaseSpecification<T> implements Specification<T> {

	private static final long serialVersionUID = 1L;

private final SearchCriteria searchCriteria;

  private String primaryKey = "";  
  //where 절에 조건으로 추가할 컬럼의 변수명(join 테이블이 있으면 해당 entity 내부의 변수명으로 작성)
  private String searchableChk = "";
  //join할 테이블에서 검색할 컬럼의 변수명
  private String joinChk = "";
  //entity내에 선언된 join할 entity의 변수명
  private String[] joinTable = {};

  public BaseSpecification(final SearchCriteria searchCriteria) {
    super();
    this.searchCriteria = searchCriteria;        
  }

  public void init(String primaryKey, String searchableChk, String joinChk, String[] joinTable) {
    this.primaryKey = primaryKey;
    this.searchableChk = searchableChk;
    this.joinChk = joinChk;    
    this.joinTable = joinTable;
  }
  
  @Override
  public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
    String searchKey = searchCriteria.getFilterKey();
    Object searchVal = searchCriteria.getValue();
    String strToSearch = searchVal.toString().toLowerCase();

    if (searchable()) {
      switch (Objects.requireNonNull(
          SearchOperation.getSimpleOperation(searchCriteria.getOperation()))) {
        case CONTAINS:
          return cb.like(getLowerExpression(root, cb, searchKey),
              "%" + strToSearch + "%");

        case DOES_NOT_CONTAIN:
          return cb.notLike(getLowerExpression(root, cb, searchKey),
              "%" + strToSearch + "%");

        case BEGINS_WITH:
          return cb.like(getLowerExpression(root, cb, searchKey), strToSearch + "%");

        case DOES_NOT_BEGIN_WITH:
          return cb.notLike(getLowerExpression(root, cb, searchKey), strToSearch + "%");

        case ENDS_WITH:
          return cb.like(getLowerExpression(root, cb, searchKey), "%" + strToSearch);

        case DOES_NOT_END_WITH:
          return cb.notLike(getLowerExpression(root, cb, searchKey), "%" + strToSearch);

        case EQUAL:
          return cb.equal(getExpression(root, searchKey), searchVal);

        case NOT_EQUAL:
          return cb.notEqual(getExpression(root, searchKey), searchVal);

        case NUL:
          return cb.isNull(getExpression(root, searchKey));

        case NOT_NULL:
          return cb.isNotNull(getExpression(root, searchKey));

        case GREATER_THAN:
          return cb.greaterThan(getStrExpression(root, searchKey), searchVal.toString());

        case GREATER_THAN_EQUAL:
          return cb.greaterThanOrEqualTo(getStrExpression(root, searchKey),
              searchVal.toString());

        case LESS_THAN:
          return cb.lessThan(getStrExpression(root, searchKey), searchVal.toString());

        case LESS_THAN_EQUAL:
          return cb.lessThanOrEqualTo(getStrExpression(root, searchKey), searchVal.toString());

        default:
          return getErrorPredicate(root, cb);
      }
    }
    return getErrorPredicate(root, cb);
  }

  private Expression<String> getLowerExpression(Root<T> root, CriteriaBuilder cb,
      String searchKey) {
    if (needJoin()) {
      return cb.lower(doJoin(root).<String>get(searchKey));
    }
    return cb.lower(root.get(searchKey));
  }

  private Expression<String> getExpression(Root<T> root, String searchKey) {
    if (needJoin()) {
      return doJoin(root).<String>get(searchKey);
    }
    return root.get(searchKey);
  }
  
  private Expression<String> getStrExpression(Root<T> root, String searchKey) {
	  if (needJoin()) {
		  return doJoin(root).<String>get(searchKey);
	  }
	  return root.<String>get(searchKey);
  }

  // 잘못된 검색일 경우 결과가 0건으로 나오도록 조정
  private Predicate getErrorPredicate(Root<T> root, CriteriaBuilder cb) {
    return cb.equal(root.get(primaryKey), 0);
  }

  // Join
  private Join<T, T> doJoin(Root<T> root) {    
    
    Join<T, T> rtn = root.join(joinTable[0], JoinType.LEFT);
    for (int i=1; i<joinTable.length; i++) {
      rtn= rtn.join(joinTable[i], JoinType.LEFT);
    }
    return rtn;    
    //return root.join(joinTable[0]).join(joinTable[1]);
  }

  // Join 이 필요한지 판단
  private boolean needJoin() {
    if (joinChk != null) {
      return Pattern.matches(joinChk, searchCriteria.getFilterKey());
    }
    return false;
  }

  // 검색가능한 column 인지 판단
  private boolean searchable() {
    return Pattern.matches(searchableChk, searchCriteria.getFilterKey());
  }
}
