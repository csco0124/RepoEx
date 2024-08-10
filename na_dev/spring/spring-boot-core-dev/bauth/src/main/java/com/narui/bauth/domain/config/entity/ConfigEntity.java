package com.narui.bauth.domain.config.entity;


import com.narui.bauth.global.auditing.entity.BaseTimeEntity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;

@Getter
@Entity
@Table(name = "config")
public class ConfigEntity extends BaseTimeEntity {

	@Id
	@Schema(description = "설정 이름")
	@Column(name = "config_key")
	private String configKey;
	
	@Schema(description = "설정할 내용을 JSON형태로 저장")
	@Column(name = "config_value")
	private String configValue;

	public ConfigEntity() {}
	
	@Builder
	public ConfigEntity(String configKey, String configValue) {
		super();
		this.configKey = configKey;
		this.configValue = configValue;
	}
	
}