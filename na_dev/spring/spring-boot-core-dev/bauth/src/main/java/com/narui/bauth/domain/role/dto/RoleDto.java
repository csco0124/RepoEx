package com.narui.bauth.domain.role.dto;

import java.util.List;

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
public class RoleDto {

  @Schema(description = "권한명")
  private String authority;
    
  @Schema(description = "기본값 여부")
  private String defaultYn;
  
  /* public RoleEntity toEntity () {
    return RoleEntity.builder()
            .authority(autority)
            .defaultYn(defaultYn)
            .build();
  }

  public static RoleDto toDto (RoleEntity entity) {
    return RoleDto.builder()
            .autority(entity.getAuthority())
            .defaultYn(entity.getDefaultYn())
            .build();
  } */

  @Getter
	@Setter
	@AllArgsConstructor
  public static class SearchRoleReq extends PageableDto {
    @Valid
		private List<SearchCriteria> searchCriteriaList;

    @Pattern(regexp = "^(all|any)$")
		private String dataOption;

    // DB에서 sort 가능한 column명 확인후 추가
		@Pattern(regexp = "^(authority|defaultYn)$")
		@Override
		public String getSort() {
			return super.getSort();
		}
  }
}