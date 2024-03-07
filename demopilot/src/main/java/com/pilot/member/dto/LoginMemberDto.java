package com.pilot.member.dto;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;

@Getter
public class LoginMemberDto extends User{
	private String id;
	private String name;
    
    public LoginMemberDto(String id, String name, String password, Collection<? extends GrantedAuthority> authorities){
        //User 클래스의 생성자를 호출한다.
        super(name, password, authorities);

        this.id = id;
        this.name = name;
    }
}
