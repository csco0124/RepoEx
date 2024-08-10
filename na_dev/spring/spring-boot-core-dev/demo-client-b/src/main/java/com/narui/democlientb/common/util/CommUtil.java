package com.narui.democlientb.common.util;

import java.util.Arrays;

import org.springframework.security.config.annotation.authentication.configurers.provisioning.UserDetailsManagerConfigurer.UserDetailsBuilder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.narui.democlientb.security.UserDetail;

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
    

    public static boolean isNumber(Object param) {
		if(param != null) {
		    if (param instanceof Number) {
		        return true;
		    } else if (param instanceof String) {
		        try {
		            Double.parseDouble((String) param);
		            return true;
		        } catch (NumberFormatException e) {
		            return false;
		        }
		    }
		}
	    return false;
	}
	
    public static Number nvl(Object param, Number result) {
		if(param != null && isNumber(param)) {
			if (result instanceof Integer) {
	            result = Integer.parseInt((String) param);
	        } else if (result instanceof Double) {
	            result = Double.parseDouble((String) param);
	        }
		}
		return result;
	}
	
	public static String nvl(Object param, String result) {
		if(param != null && !"".equals(param)) {
			result = (String) param;
		}
		return result;
	}
}
