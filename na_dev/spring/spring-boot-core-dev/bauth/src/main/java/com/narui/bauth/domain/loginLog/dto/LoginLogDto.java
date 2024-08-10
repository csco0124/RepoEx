package com.narui.bauth.domain.loginLog.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.narui.bauth.domain.loginLog.entity.LoginLogEntity;
import com.narui.bauth.global.search.dto.PageableDto;
import com.narui.bauth.global.search.dto.SearchCriteria;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginLogDto {
	private Long id;

	@Schema(description = "이메일")
	private String email;
	@Schema(description = "로그인 타입(S : 로그인 성공, F : 로그인 실패)")
	private String type;
	@Schema(description = "응답 상태코드")
	private Integer statusNum;
	@Schema(description = "로그인 실패 에러 메시지")
	private String errMsg;
	@Schema(description = "등록일자")
	private LocalDateTime createdDate;
	@Schema(description = "수정일자")
	private LocalDateTime modifiedDate;
	@Schema(description = "로그인 경로")
	private String loginChannel;

	private Integer selectCnt;
	private Integer pageNum;
	private String startDate;
	private String endDate;

	public LoginLogEntity toEntity() {
		return LoginLogEntity.builder()
				.id(id)
				.email(email)
				.type(type)
				.statusNum(statusNum)
				.errMsg(errMsg)
				.loginChannel(loginChannel)
				.build();
	}

	public static LoginLogDto toDto(LoginLogEntity entity) {
		return LoginLogDto.builder()
				.id(entity.getId())
				.email(entity.getEmail())
				.type(entity.getType())
				.statusNum(entity.getStatusNum())
				.errMsg(entity.getErrMsg())
				.loginChannel(entity.getLoginChannel())
				.createdDate(entity.getCreatedDate())
				.modifiedDate(entity.getModifiedDate())
				.build();
	}

	@Getter
	@Setter
	@AllArgsConstructor
	public static class Search extends PageableDto {

		@Valid // List안쪽의 값도 Vali를 하기 위해 추가
		private List<SearchCriteria> searchCriteriaList;

		@Pattern(regexp = "^(all|any)$")
		private String dataOption;

		// DB에서 sort 가능한 column명 확인후 추가
		@Pattern(regexp = "^(email|type|statusNum|createdDate)$")
		@Override
		public String getSort() {
			return super.getSort();
		}
	}

	@Getter
	@Setter
	@AllArgsConstructor
	public static class SearchRes {
		@Schema(description = "SEQ")
		private Long id;
		@Schema(description = "이메일")
		private String email;
		@Schema(description = "로그인 타입(S : 로그인 성공, F : 로그인 실패)")
		private String type;
		@Schema(description = "응답 상태코드")
		private Integer statusNum;
		@Schema(description = "로그인 실패 에러 메시지")
		private String errMsg;
		@Schema(description = "등록일자")
		private LocalDateTime createdDate;
		@Schema(description = "수정일자")
		private LocalDateTime modifiedDate;
		@Schema(description = "로그인 경로")
		private String loginChannel;
	}
}
