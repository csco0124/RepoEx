package com.narui.bauth.domain.loginLog.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.Nullable;

import com.narui.bauth.domain.loginLog.entity.LoginLogEntity;

public interface LoginLogRepository extends JpaRepository<LoginLogEntity, Long>, JpaSpecificationExecutor<LoginLogEntity> {
	
	@Override
	Page<LoginLogEntity> findAll(@Nullable Specification<LoginLogEntity> spec, Pageable pageable);
	
	
	@Query(value = "SELECT id,created_date,modified_date,email,err_msg,status_num,type from login_log WHERE email like CONCAT('%',:email,'%') AND status_num = :statusNum AND type = :type ORDER BY created_date DESC", nativeQuery = true)
	public List<LoginLogEntity> selectLoginLogList(@Param(value = "email") String email, @Param(value = "statusNum") Integer statusNum, @Param(value = "type") String type);
	
	@Query(value = "WITH RECURSIVE dates AS ("
			+ "  SELECT DATE('2023-10-01') AS date"
			+ "  UNION ALL"
			+ "  SELECT DATE_ADD(date, INTERVAL 1 DAY)"
			+ "  FROM dates"
			+ "  WHERE DATE_ADD(date, INTERVAL 1 DAY) < DATE_ADD(DATE('2023-10-01'), INTERVAL day(LAST_DAY('2023-10-01')) DAY)"
			+ ")"
			+ " SELECT "
			+ "	standard.date AS standard_date_key,"
			+ "	ifnull(cnt_data.google_cnt, 0) AS google,"
			+ "	ifnull(cnt_data.naver_cnt, 0) AS naver,"
			+ "	ifnull(cnt_data.kakao_cnt, 0) AS kakao,"
			+ "	ifnull(cnt_data.email_cnt, 0) AS email,"
			+ "	ifnull(cnt_data.total_cnt, 0) AS total"
			+ " FROM dates AS standard"
			+ " LEFT OUTER JOIN ("
			+ "	SELECT"
			+ "	DATE(created_date) standard_date,"
			+ "	count(CASE WHEN login_channel = 'google' THEN 1 END) AS google_cnt,"
			+ "	count(CASE WHEN login_channel = 'naver' THEN 1 END) AS naver_cnt,"
			+ "	count(CASE WHEN login_channel = 'kakao' THEN 1 END) AS kakao_cnt,"
			+ "	count(CASE WHEN login_channel = 'email' THEN 1 END) AS email_cnt,"
			+ "	count(*) AS total_cnt"
			+ " FROM login_log"
			+ " WHERE 1=1"
			+ "	AND type != 'E'"
			+ " GROUP BY DATE(created_date)"
			+ ") cnt_data"
			+ " ON standard.date = DATE(cnt_data.standard_date)"
			+ " ORDER BY standard_date_key", nativeQuery = true)
	public List<Map<String, Object>> selectLoginLogCountByDateList(@Param(value = "startDate") String startDate);
	
	@Query(value = "SELECT"
			+ "	count(CASE WHEN login_channel = 'google' THEN 1 END) AS google_cnt,"
			+ "	count(CASE WHEN login_channel = 'naver' THEN 1 END) AS naver_cnt,"
			+ "	count(CASE WHEN login_channel = 'kakao' THEN 1 END) AS kakao_cnt,"
			+ "	count(CASE WHEN login_channel = 'email' THEN 1 END) AS email_cnt,"
			+ "	count(*) AS total_cnt"
			+ " FROM login_log"
			+ " WHERE 1=1"
			+ "	AND type != 'E'"
			+ "	AND DATE(created_date) >= STR_TO_DATE('2023-10-01', '%Y-%m-%d')"
			+ " AND DATE(created_date) <= STR_TO_DATE('2023-10-31', '%Y-%m-%d')"
			, nativeQuery = true)
	public Map<String, Object> selectTotalLoginTypeCntByDate(@Param(value = "startDate") String startDate);
	
	@Query(value = "SELECT"
			+ "	count(CASE WHEN google_key IS NOT null THEN 1 END) AS google_user_cnt,"
			+ "	count(CASE WHEN naver_key  IS NOT null THEN 1 END) AS naver_user_cnt,"
			+ "	count(CASE WHEN kakao_key  IS NOT null THEN 1 END) AS kakao_user_cnt,"
			+ "	count(CASE WHEN ((google_key IS NULL) AND (naver_key IS NULL) AND (kakao_key IS NULL)) THEN 1 END) AS email_user_cnt,"
			+ "	count(*) AS total_user_cnt"
			+ " FROM user"
			, nativeQuery = true)
	public Map<String, Object> selectTotalTotalUserCnt(@Param(value = "startDate") String startDate);
	
	@Query(value = "SELECT "
			+ "	mon,"
			+ "	google_cnt,"
			+ "	naver_cnt,"
			+ "	kakao_cnt,"
			+ "	email_cnt,"
			+ "	total_cnt,"
			+ "	round(((google_cnt * 100) / total_cnt),2) AS google_per,"
			+ "	round(((naver_cnt * 100) / total_cnt),2) AS naver_per,"
			+ "	round(((kakao_cnt * 100) / total_cnt),2) AS kakao_per,"
			+ "	round(((email_cnt * 100) / total_cnt),2) AS email_per"
			+ " FROM "
			+ "	(SELECT "
			+ "		DATE_FORMAT(created_date, '%Y-%m') AS mon,"
			+ "		count(CASE WHEN login_channel = 'google' THEN 1 END) AS google_cnt,"
			+ "		count(CASE WHEN login_channel = 'naver' THEN 1 END) AS naver_cnt,"
			+ "		count(CASE WHEN login_channel = 'kakao' THEN 1 END) AS kakao_cnt,"
			+ "		count(CASE WHEN login_channel = 'email' THEN 1 END) AS email_cnt,"
			+ "		count(*) AS total_cnt"
			+ "	FROM login_log"
			+ "	WHERE 1=1"
			+ "		AND TYPE != 'E'"
			+ "		AND created_date >= DATE_ADD(DATE('2023-10-01 00:00:00'), INTERVAL -1 month)"
			+ "	GROUP BY mon) base"
			, nativeQuery = true)
	public List<Map<String, Object>> selectMonthlyLogintypeCnt(@Param(value = "startDate") String startDate);
	
	@Query(value = "SELECT"
			+ "	DATE_FORMAT(created_date, '%Y-%m-%d') AS today,"
			+ "	count(CASE WHEN login_channel = 'google' THEN 1 END) AS google_cnt,"
			+ "	count(CASE WHEN login_channel = 'naver' THEN 1 END) AS naver_cnt,"
			+ "	count(CASE WHEN login_channel = 'kakao' THEN 1 END) AS kakao_cnt,"
			+ "	count(CASE WHEN login_channel = 'email' THEN 1 END) AS email_cnt,"
			+ "	count(*) AS total_cnt"
			+ " FROM login_log"
			+ " WHERE 1=1"
			+ "	AND type != 'E'"
			+ "	AND STR_TO_DATE(created_date, '%Y-%m-%d') = DATE_FORMAT(NOW() , '%Y-%m-%d')"
			, nativeQuery = true)
	public Map<String, Object> selectTodayLogintypeCnt(@Param(value = "startDate") String startDate);
	
	
	List<LoginLogEntity> findByEmail(String email);
}
