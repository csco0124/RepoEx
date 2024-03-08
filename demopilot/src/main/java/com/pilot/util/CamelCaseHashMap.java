package com.pilot.util;

import java.util.LinkedHashMap;

import com.google.common.base.CaseFormat;

/**
 * MyBatis ResultType을 Map으로 받아올 때 key값을 CamelCase 형태로 변환
 */
@SuppressWarnings({ "unchecked", "rawtypes", "serial" })
public class CamelCaseHashMap extends LinkedHashMap {
	
	@Override
	public Object put(Object key, Object value) {
		return super.put(toLowerCamel((String) key), value);
	}

	private static String toLowerCamel(String key) {
		return CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.LOWER_CAMEL, key);
	}
}
