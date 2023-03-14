package org.hdcd.common.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@Aspect
public class ServiceLoggerAdvice {

	@AfterReturning("execution(* org.hdcd.service.BoardService*.*(..))")
	public void logReturning(JoinPoint jp) {
		log.info("logReturning");
		log.info("logReturning : " + jp.getSignature());
	}

}
