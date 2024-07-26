package com.lyn.component.jwt;

import java.io.IOException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.ErrorResponse;

import com.lyn.model.common.ApiResponse;
import com.lyn.model.exception.CustomException;
import com.lyn.model.exception.ErrorCode;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;


/*
 * 인증실패 또는 인증해더를 전달받지 못했을때 처리 핸들러
 * 일단 필터를 통과한뒤에 처리되는 handler, 필터를 통과하지 않은 일종의 authenticationConfiguration 에서 PermitAll 처리되 세션은 처리되지 않음.
 * AccessDeniedHandler 도 마찬가지로 보임
 * */

@Slf4j
@Component
public class JwtAuthenticationEntryPointHandler implements AuthenticationEntryPoint {
	
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

		final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
		
		log.info(String.format("JwtAuthenticationEntryPointHandler::authorization:%s", authorization));
		log.info(String.format("JwtAuthenticationEntryPointHandler::authException:%s", authException.getMessage()));
		
		String accept = request.getHeader("Accept");
		log.info(String.format("JwtAuthenticationEntryPointHandler::accept:%s", accept));
		
		JwtAuthenticationFilter.setErrorResponse(response, ErrorCode.ACCESS_FORBIDDEN);
	}

}
