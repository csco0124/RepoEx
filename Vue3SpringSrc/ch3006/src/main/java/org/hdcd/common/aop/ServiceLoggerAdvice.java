package org.hdcd.common.aop;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@Aspect
public class ServiceLoggerAdvice {

	@After("execution(* org.hdcd.service.BoardService*.*(..))")
	public void endLog(JoinPoint jp) {
		log.info("endLog");
		log.info("endLog : " + jp.getSignature());
		log.info("endLog : " + Arrays.toString(jp.getArgs()));
	}

}
