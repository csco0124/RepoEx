package com.narui.democlientb.common.handler;

import java.io.PrintWriter;
import java.util.Collection;
import java.util.Map;
import java.util.Objects;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.ModelAndView;

import com.narui.democlientb.common.util.CommUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class SessionInterceptorHandler implements HandlerInterceptor{
	
//	@Autowired
//	private CommonService commonService;
	
	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object handler) throws Exception{
		String[] reqEmpNm = req.getParameterValues("emplyNmbr");
		String reqURI = req.getRequestURI();
		boolean empNmYN = true;
		
		log.info("preHandle start");

		Map<?, ?> pathVariables = (Map<?, ?>) req.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		
		try {
			Collection<? extends GrantedAuthority> authorities = CommUtil.getLoginUser().getAuthorities();
			String authoritiesStr = authorities == null ?
					null : CommUtil.getLoginUser().getAuthorities().toString();
			//OTP인증자가 1차 인증 상태로 workday로 이동한 경우 Access Denied
			if(!Objects.equals(null, authoritiesStr) && authoritiesStr.contains("PRE_AUTH")) {
				String msg = "Access is denied";
				throw new AccessDeniedException(msg);
			}
			if(reqEmpNm != null || (pathVariables != null && pathVariables.get("emplyNmbr") != null)) {
				if((pathVariables != null && pathVariables.size() == 0) && pathVariables.get("emplyNmbr") != null) {
					log.debug("pathvariable :: {}", pathVariables);
					log.debug("pathvariable param :: {}", pathVariables.get("emplyNmbr"));
				}
				
				Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
				UserDetails userDetail = (UserDetails) user;
				
				if(reqEmpNm == null) {
					if(!pathVariables.get("emplyNmbr").equals(userDetail.getUsername())) {
						empNmYN = false;
					}
				}else {
					for(String empNm : reqEmpNm) {
						if(!userDetail.getUsername().equals(empNm)) {
								empNmYN = false;
								break;
						}
					}
		    	}
		    	
				if(!empNmYN) {
					log.debug("세션값 바뀜");
					if(userDetail.getAuthorities().size() != 0) {
						return true;
					}
					return false;
				}else {
					System.out.println("세션값 안바뀜");
					return true;
				}
			}else {
				System.out.println("사번 값없음");
				System.out.println(req.getRequestURI());
				return true;
			}
		}catch(RuntimeException e){
			e.printStackTrace();
			throw e;
		}finally {
			log.info("preHandle stop");
		}
	}
	
	@Override
	public void postHandle(HttpServletRequest req, HttpServletResponse res, Object handler, ModelAndView modelAndView) throws Exception{
	}
	
	@Override
	public void afterCompletion(HttpServletRequest req, HttpServletResponse res, Object handler, Exception ex) throws Exception{
//		log.debug("afterCompletion");
//		boolean chiefChange = commonService.authorities(res);
//
//		if(chiefChange) {
//			SecurityContextHolder.clearContext();
//			PrintWriter out = res.getWriter();
//			out.println("<script>commutil.alert('권한이 변경되었습니다.', () => {\r\n"
//					+ "				commutil.logout();\r\n"
//					+ "			});</script>");
//			out.flush();
//			out.close();
//		}
	}
	
	
	
}
