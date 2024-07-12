package com.lyn.component.jwt;

import java.io.IOException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


/*
 * JwtAccessDeniedHandler
 * 인가 실패핸들러
 * */
@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

	Logger logger = LogManager.getLogger(JwtAccessDeniedHandler.class);
	
	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {

		/*
		 * 토큰 인증 후 권한 거부시
		 * */
		
		logger.info(String.format("JwtAccessDeniedHandler:: %s", accessDeniedException.toString()));
		logger.info(String.format("JwtAccessDeniedHandler:: %s", "XXXX"));
		
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
		
		
		
	}

}
