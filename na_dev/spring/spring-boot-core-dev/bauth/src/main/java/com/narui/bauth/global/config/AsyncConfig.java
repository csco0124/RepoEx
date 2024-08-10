package com.narui.bauth.global.config;

import java.util.concurrent.Executor;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer {
	
	@Override
	public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2); // 기본 쓰레드 개수
        executor.setMaxPoolSize(10); // 최대 쓰레드 개수
        executor.setQueueCapacity(500); // CorePool이 초과될때 Queue에 저장했다가 꺼내서 실행 (500개까지 저장함)
        executor.setThreadNamePrefix("async-"); // Thread 접두사
        executor.initialize();
        return executor;
    }
	
}
