package com.narui.bauth.domain.loginLog.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.narui.bauth.domain.loginLog.dto.LoginLogDto;
import com.narui.bauth.domain.loginLog.entity.LoginLogEntity;
import com.narui.bauth.domain.loginLog.mapstruct.LoginLogMsMapper;
import com.narui.bauth.domain.loginLog.repository.LoginLogRepository;
import com.narui.bauth.domain.loginLog.specification.OAuth2LoginLogSpecification;
import com.narui.bauth.global.util.ModelMapperUtil;

import io.netty.util.internal.StringUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class OAuth2LoginLogService {

	@PersistenceContext
	EntityManager em;

	@Autowired
	private LoginLogRepository loginLogRepository;

	public Map<String, Object> selectLoginLogObject(LoginLogDto dto) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		Specification<LoginLogEntity> spec = (root, query, criteriaBuilder) -> null;

		if (!StringUtil.isNullOrEmpty(dto.getStartDate())) {
			spec = spec.and(OAuth2LoginLogSpecification.betweenDatetime(dto.getStartDate(), dto.getEndDate()));
		}
		if (!StringUtil.isNullOrEmpty(dto.getEmail())) {
			spec = spec.and(OAuth2LoginLogSpecification.likeEmail(dto.getEmail()));
		}
		if (dto.getStatusNum() != null && dto.getStatusNum().intValue() > -1) {
			spec = spec.and(OAuth2LoginLogSpecification.equalsStatusNum(dto.getStatusNum().intValue()));
		}
		if (!"A".equals(dto.getType())) {
			spec = spec.and(OAuth2LoginLogSpecification.equalsType(dto.getType()));
		}

		Pageable page = PageRequest.of(dto.getPageNum().intValue(), dto.getSelectCnt().intValue(),
				Sort.by("createdDate").descending());
		Page<LoginLogEntity> resultPage = loginLogRepository.findAll(spec, page);

		List<LoginLogDto> dtoModelList = ModelMapperUtil.transModelList(resultPage.getContent(), LoginLogDto.class);

		resultMap.put("list", dtoModelList);
		resultMap.put("totalCnt", resultPage.getTotalElements());
		resultMap.put("totalPage", resultPage.getTotalPages());
		return resultMap;
	}
	
	public Map<String, Object> selectLoginLogCountList(String startDate, String endDate) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		resultMap.put("loginLogCountByDateList", loginLogRepository.selectLoginLogCountByDateList(startDate));
		resultMap.put("totalLoginTypeCntByDate", loginLogRepository.selectTotalLoginTypeCntByDate(startDate));
		resultMap.put("totalUserCnt", loginLogRepository.selectTotalTotalUserCnt(startDate));
		resultMap.put("monthlyLogintypeCnt", loginLogRepository.selectMonthlyLogintypeCnt(startDate));
		resultMap.put("todayLogintypeCnt", loginLogRepository.selectTodayLogintypeCnt(startDate));
		
		return resultMap;
	}

	public List<LoginLogEntity> selectSocialKey(String email) {
		return loginLogRepository.findByEmail(email);
	}

	@Transactional
	public void saveLoginLog(LoginLogDto dto) throws Exception {
		LoginLogEntity loginLogEntity = dto.toEntity();
		loginLogRepository.save(loginLogEntity);
	}

	public Page<LoginLogDto.SearchRes> searchLoginLogs(Specification<LoginLogEntity> spec, Pageable pageable) {

		Page<LoginLogEntity> loginLogs = loginLogRepository.findAll(spec, pageable);
		Page<LoginLogDto.SearchRes> res = loginLogs.map(new Function<LoginLogEntity, LoginLogDto.SearchRes>() {
			@Override
			public LoginLogDto.SearchRes apply(LoginLogEntity loginLog) {
				return LoginLogMsMapper.INSTANCE.toLoginLogDto(loginLog);
			}
		});
		return res;
	}

}
