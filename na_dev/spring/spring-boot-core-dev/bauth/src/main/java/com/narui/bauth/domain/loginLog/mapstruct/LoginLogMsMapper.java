package com.narui.bauth.domain.loginLog.mapstruct;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.narui.bauth.domain.loginLog.dto.LoginLogDto;
import com.narui.bauth.domain.loginLog.entity.LoginLogEntity;

@Mapper(componentModel = "spring")
public interface LoginLogMsMapper {
  
  LoginLogMsMapper INSTANCE = Mappers.getMapper(LoginLogMsMapper.class);
    
  LoginLogDto.SearchRes toLoginLogDto(LoginLogEntity loginLog);
  
}
