package com.narui.bauth.domain.authority.dto;

import java.util.List;

import com.narui.bauth.domain.authority.entity.AuthorityEntity;
import com.narui.bauth.domain.user.entity.UserEntity;

import io.swagger.v3.oas.annotations.media.Schema;
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
public class AuthorityDto {

  @Schema(description = "고유번호")
  private String id;
    
  @Schema(description = "권한코드")
  private String authority_code;

  @Schema(description = "유저id")
  private Long userId;
  
  public AuthorityDto(String id, String authority_code, UserEntity userEntity) {
	  this.id = id;
	  this.authority_code = authority_code;
	  this.userId = userEntity.getId();
  }
  
  public AuthorityDto(AuthorityEntity authorityEntity) {
	  this.id = authorityEntity.getId().toString();
	  this.authority_code = authorityEntity.getAuthority();
	  this.userId = authorityEntity.getUser().getId();
  }
  
  	@Getter
	public static class UserPageAuthorityDto {
		@Schema(description = "유저 id")
		private Long userId;
		
		@Schema(description = "권한코드 리드스")
		private List<String> authority; // @link lientRoleEntity

		public UserPageAuthorityDto(Long userId, List<String> authority) {
			this.userId = userId;
			this.authority = authority;
		}
	}
}