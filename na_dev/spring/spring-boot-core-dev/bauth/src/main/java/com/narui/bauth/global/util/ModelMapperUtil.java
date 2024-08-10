package com.narui.bauth.global.util;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;

/**
 * ModelMapper 유틸<br />
 * 주로 JPA에서 Entity와 Dto의 상호 매핑을 위해 사용
 */
public class ModelMapperUtil {
	private static ModelMapper modelMapper = new ModelMapper();
	
	/**
	 * Object에 있는 필드값들을 다른 Object로 Mapping (조건 : 필드값이 같은 필드만)<br />
	 * <b>ex) ModelMapperUtil.transModel(ModelEntity 객체, ModelDto.class) -> ModelEntity객체가 ModelDto객체로 매핑됨</b>
	 * @param <T>
	 * @param o 기준 객체
	 * @param c 타겟 객체
	 * @return
	 */
	public static <T> T transModel(Object o, Class<T> c){
		return (T) modelMapper.map(o, c);
	}
	
	/**
	 * Object List를 다른 객체의 List로 변환<br />
	 * <b>ex) ModelMapperUtil.transModelList(ModelEntity List객체, ModelDto.class) -> List&lt;ModelEntity&gt; 가 List&lt;ModelDto&gt; 로 변환됨</b>
	 * @param <T>
	 * @param o 기준 Object list 객체
	 * @param c 리턴을 원하는 List의 Object class
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static <T> List<T> transModelList(Object o, Class<T> c) throws Exception{
		try {
			List<Object> list = (List<Object>) o;
			return (List<T>) list.stream().map(n -> ModelMapperUtil.transModel(n, c)).collect(Collectors.toList());
		} catch(Exception e) {
			throw new Exception(e);
		}
	}
	
}
