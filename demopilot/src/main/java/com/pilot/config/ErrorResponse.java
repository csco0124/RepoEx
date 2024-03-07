package com.pilot.config;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.ToString;

@Builder
@ToString
public class ErrorResponse {
	@JsonProperty
	private int code;
	@JsonProperty
	private String message;
}
