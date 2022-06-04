package org.hdcd.common.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@Aspect
public class ServiceLoggerAdvice {

	@AfterThrowing(pointcut = "execution(* org.hdcd.service.BoardService*.*(..))", throwing = "e")
	public void logException(JoinPoint jp, Exception e) {
		log.info("logException");
		log.info("logException : " + jp.getSignature());

		log.info("logException : " + e);
	}

}
