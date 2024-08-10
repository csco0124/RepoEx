package com.narui.bauth.domain.user.mapstruct;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import com.narui.bauth.domain.authority.entity.AuthorityEntity;
import com.narui.bauth.domain.clientAuthority.entity.ClientAuthorityEntity;
import com.narui.bauth.domain.user.dto.UserDto;
import com.narui.bauth.domain.user.entity.PhoneEntity;
import com.narui.bauth.domain.user.entity.UserEntity;
import com.narui.bauth.domain.webauthn.entity.AuthenticatorEntity;

@Mapper(componentModel = "spring")
public interface UserMsMapper {

  UserMsMapper INSTANCE = Mappers.getMapper(UserMsMapper.class);

  @Mapping(target="username", source="nickname")
  UserDto.AccountLookupRes toDto(UserEntity user);
  
  @Named("getPhone")
  static String getPhone(PhoneEntity phoneEntity) {
	  return phoneEntity.getPhone();     
  }
  @Named("getAuthority")
  static String getAuthority(AuthorityEntity authorityEntity) {
    return authorityEntity.getAuthority();      
  }
  @Named("getClientAuthority")
  static String getClientAuthority(ClientAuthorityEntity clientAuthorityEntity) {
    return clientAuthorityEntity.getClientRoleEntity().getAuthority();      
  }
  @Named("getAuthenticators")
  static Long getAuthenticators(AuthenticatorEntity authenticatorEntity){
	  return authenticatorEntity.getUser().getId();
  }
  
  @Mapping(target="phone", source="phone", qualifiedByName = "getPhone")
  @Mapping(target="authorities", source="authorities", qualifiedByName = "getAuthority")
  @Mapping(target="clientAuthorities", source="clientAuthorities", qualifiedByName = "getClientAuthority")
  UserDto.UserPageData toUserDto(UserEntity user);
  List<UserDto.UserPageData> toUserDtos(List<UserEntity> user);
  
  @Mapping(target="authenticators", source="authenticators", qualifiedByName = "getAuthenticators")
  UserDto.authTypeResDto toAuthTypeUserDto(UserEntity userEntity);
  List<UserDto.authTypeResDto> toAuthTypeUserDtos(List<UserEntity> user);
}

