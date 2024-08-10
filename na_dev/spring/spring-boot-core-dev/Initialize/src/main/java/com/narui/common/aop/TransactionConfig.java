package com.narui.common.aop;

import java.util.ArrayList;
import java.util.List;

import org.springframework.aop.Advisor;
import org.springframework.aop.aspectj.AspectJExpressionPointcut;
import org.springframework.aop.support.DefaultPointcutAdvisor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.TransactionManager;
import org.springframework.transaction.interceptor.MatchAlwaysTransactionAttributeSource;
import org.springframework.transaction.interceptor.RollbackRuleAttribute;
import org.springframework.transaction.interceptor.RuleBasedTransactionAttribute;
import org.springframework.transaction.interceptor.TransactionInterceptor;

/**
 * 트랜잭션 AOP (*Service.java 파일의 모든 메서드에 트랜잭션 적용됨)
 * @author dgkim
 *
 */
@Configuration
public class TransactionConfig {
	@Autowired
	private TransactionManager transactionManager;

	private static final String AOP_TRANSACTION_EXPRESSION = "execution(* com.narui..service.*Service.*(..))";
	
	@Bean
	public TransactionInterceptor transactionAdvice() {
		List<RollbackRuleAttribute> rollbackRules = new ArrayList<RollbackRuleAttribute>();
		rollbackRules.add(new RollbackRuleAttribute(Exception.class));
		rollbackRules.add(new RollbackRuleAttribute(Error.class));
        
		RuleBasedTransactionAttribute transactionAttribute = new RuleBasedTransactionAttribute();
		transactionAttribute.setRollbackRules(rollbackRules);
		transactionAttribute.setName("*");

		MatchAlwaysTransactionAttributeSource attributeSource = new MatchAlwaysTransactionAttributeSource();
		attributeSource.setTransactionAttribute(transactionAttribute);

		return new TransactionInterceptor(transactionManager, attributeSource);
	}

	@Bean
	public Advisor transactionAdvisor() {
		AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();
		pointcut.setExpression(AOP_TRANSACTION_EXPRESSION);

		return new DefaultPointcutAdvisor(pointcut, transactionAdvice());
	}
}
