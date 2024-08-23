package com.lyn.component.jwt;

import java.io.IOException;
import java.util.Collection;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwt;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


/*
 * JwtAccessDeniedHandler
 * 인가 실패핸들러
 * */


@Slf4j
@RequiredArgsConstructor
@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

	//Logger logger = LogManager.getLogger(JwtAccessDeniedHandler.class);
	
	private final JwtUtil jwtUtil;
	
	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {

		/*
		 * 토큰 인증 후 권한 거부시,  
		 * 인증token 자체가 문제가 아니라 토큰은 있으나 권한이 없는경우 Deny handler
		 * */
		
		String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION).replace("Bearer ", "");
		
		log.info("[Denied AccessToken] :: {}", accessToken);
		
		String userId = jwtUtil.getUserIdFromToken(accessToken);
		String roleInfo = jwtUtil.getRoleInfoFromToken(accessToken).stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));
		 
		log.info("[Denied userID] :: {} >> {}", userId, roleInfo);
		
		//logger.info(String.format("JwtAccessDeniedHandler:: %s", accessDeniedException.toString()));
		//logger.info(String.format("JwtAccessDeniedHandler:: %s", "XXXX"));
		
		response.sendError(HttpServletResponse.SC_FORBIDDEN);

	}
	
	private String getRolesFromToken(String token) {
		
		String roleInfo = "";
		
		try {
			
			
			
		}catch(Exception e) {
			log.error("[getRolesFromToken] {}", e.getMessage());
		}
		
		
		return roleInfo;
	}
}
