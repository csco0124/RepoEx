package com.narui.bauth.domain.clientAuthority.dto;

import java.util.List;

import com.narui.bauth.global.search.dto.PageableDto;
import com.narui.bauth.global.search.dto.SearchCriteria;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ClientAuthorityDto {

	// @NoArgsConstructor
	public ClientAuthorityDto() {}
	
	@Schema(description = "고유번호")
	private Long id;
	
	@Schema(description = "권한코드")
	private String authority; // @link lientRoleEntity
	
	@Schema(description = "유저 id")
	private Long userId;

	@Builder
	public ClientAuthorityDto(Long id, String authority, Long userId) {
		this.id = id;
		this.authority = authority;
		this.userId = userId;
	}
	
	
	@Getter
	public static class search extends PageableDto {
		
		@Valid // SearchCriteria 내부의 값도 유효성검사
		List<SearchCriteria> searchCriteriaList;
		
		// DB에서 sort 가능한 column명 확인후 추가
		@Pattern(regexp = "^(id|authority|userId)$")
		@Override
		public String getSort() {
			return super.getSort();
		}
	}
	
	@Getter
	public static class UserPageClientAuthorityDto {
		@Schema(description = "유저 id")
		private Long userId;
		
		@Schema(description = "권한코드 리스트")
		private List<String> authority; // @link lientRoleEntity

		public UserPageClientAuthorityDto(Long userId, List<String> authority) {
			this.userId = userId;
			this.authority = authority;
		}
	}
}
