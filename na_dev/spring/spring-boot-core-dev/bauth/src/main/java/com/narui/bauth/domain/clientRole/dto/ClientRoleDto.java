package com.narui.bauth.domain.clientRole.dto;

import java.util.List;

import com.narui.bauth.domain.clientRole.entity.ClientRoleEntity;
import com.narui.bauth.global.search.dto.PageableDto;
import com.narui.bauth.global.search.dto.SearchCriteria;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
public class ClientRoleDto {
	
	public ClientRoleDto() {}
	
	@Schema(description = "권한코드")
	private String authority;
	
	@Schema(description = "클라이언트 name")
	private String clientName;
	
	@Schema(description = "클라이언트 id")
	private String registeredClientId;
	
	@Schema(description = "기본값여부")
	private String defaultYn;
	
	@Builder
	public ClientRoleDto(String authority, String clientName, String registeredClientId, String defaultYn) {
		this.authority = authority;
		this.clientName = clientName;
		this.registeredClientId = registeredClientId;
		this.defaultYn = defaultYn;
	}
	
	public ClientRoleDto(ClientRoleEntity clientRoleEntity) {
		this.authority = clientRoleEntity.getAuthority();
		this.clientName = clientRoleEntity.getClientEntity().getClientName();
		this.registeredClientId = clientRoleEntity.getClientEntity().getId();
		this.defaultYn = clientRoleEntity.getDefaultYn();
	}
	
	public void setAuthority(String authority) {
		this.authority = authority;
	}
	
	public void setDefaultYn(String defaultYn) {
		this.defaultYn = defaultYn;
	}
	
	// --------------------------- inner class ---------------------------
	
	@Getter
	@Setter
	@NoArgsConstructor
	public static class Search extends PageableDto {

		@Valid // List안쪽의 값도 Valid를 하기 위해 추가
		private List<SearchCriteria> searchCriteriaList;

		@Pattern(regexp = "^(all|any)$")
		private String dataOption;
		
		public Search(
				@Valid List<SearchCriteria> searchCriteriaList,
				@Pattern(regexp = "^(all|any)$") String dataOption
		) {
			this.searchCriteriaList = searchCriteriaList;
			this.dataOption = dataOption;
		}
		
		// DB에서 sort 가능한 column명 확인후 추가
		@Pattern(regexp = "^(authority|clientEntity.clientName|registeredClientId|defaultYn)$")
		@Override
		public String getSort() {
			return super.getSort();
		}
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class SearchRes {
		@Schema(description = "권한코드")
		private String authority;
		@Schema(description = "클라이언트 name")
		private String clientName;
		@Schema(description = "oauth2_registered_client_Id (pk)")
		private String oauth2RegisteredClientId;
		@Schema(description = "oauth2_registered_client_client_Id (unique)")
		private String oauth2RegisteredClientClientId; 
		@Schema(description = "기본값여부")
		private String defaultYn;
		
		public SearchRes(
				String authority,
				String clientName,
				String oauth2RegisteredClientId,
				String oauth2RegisteredClientClientId,
				String defaultYn
		) {
			this.authority = authority;
			this.clientName = clientName;
			this.oauth2RegisteredClientId = oauth2RegisteredClientId;
			this.oauth2RegisteredClientClientId = oauth2RegisteredClientClientId;
			this.defaultYn = defaultYn;
		}
		
		
	}
}
