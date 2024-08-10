package com.narui.democlienta.common.util;

import java.util.Arrays;

import org.springframework.security.config.annotation.authentication.configurers.provisioning.UserDetailsManagerConfigurer.UserDetailsBuilder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.narui.democlienta.security.UserDetail;

public class CommUtil {

    /**
     * 로그인한 사용자의 정보 반환
     * @return
     */
    public static UserDetails getLoginUser() {
        UserDetails userDetails;
        
        userDetails = commGetPrincipal();
        
        if(userDetails == null) {
        	//throw new CustomException(ErrorCode.NOT_VALID_SESSTION);
        }
        return userDetails;
    }
    
    private static UserDetail commGetPrincipal() {
    	try {
            return (UserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        } catch (Exception e) {
            return (UserDetail) UserDetail.builder().build();
        }
        
    }
}
