package com.narui.test.util;

import org.springframework.stereotype.Component;

import com.narui.test.controller.ApiDummyController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class CommonUtils{
	
	public boolean isNumber(Object param) {
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
	
	public Number nvl(Object param, Number result) {
		if(param != null && isNumber(param)) {
			if (result instanceof Integer) {
	            result = Integer.parseInt((String) param);
	        } else if (result instanceof Double) {
	            result = Double.parseDouble((String) param);
	        }
		}
		return result;
	}
	
	public String nvl(Object param, String result) {
		if(param != null && !"".equals(param)) {
			result = (String) param;
		}
		return result;
	}
}
