package com.narui.bauth.global.search.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchCriteria {

	@NotNull
	@Schema(description = "검색키")
	private String filterKey;

	@NotNull
	@Schema(description = "검색값")
	private Object value;

	@NotNull
	@Pattern(regexp = "^(cn|nc|eq|ne|bw|bn|ew|en|nu|nn|gt|ge|lt|le)$")
	@Schema(description = "검색조건")
	private String operation;

	@JsonIgnore
	private String dataOption;

	public SearchCriteria(String filterKey, String operation, Object value) {
		super();
		this.filterKey = filterKey;
		this.operation = operation;
		this.value = value;
	}
}
