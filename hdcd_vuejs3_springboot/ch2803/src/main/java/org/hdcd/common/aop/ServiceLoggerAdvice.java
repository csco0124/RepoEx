package org.hdcd.common.aop;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@Aspect
public class ServiceLoggerAdvice {

	@Before("execution(* org.hdcd.service.BoardService*.*(..))")
	public void startLog(JoinPoint jp) {
		log.info("startLog");
		log.info("startLog : " + jp.getSignature());
		log.info("startLog : " + Arrays.toString(jp.getArgs()));
	}

}
