package org.hdcd.common.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@Aspect
public class TimeCheckerAdvice {

	@Before("execution(* org.hdcd.service.BoardService*.*(..))")
	public void log(JoinPoint jp) {

		Object targetObject = jp.getTarget();

		log.info("targetObject = " + targetObject);

		Object thisObject = jp.getThis();

		log.info("thisObject = " + thisObject);

		Object[] args = jp.getArgs();

		log.info("args.length = " + args.length);

	}

}
