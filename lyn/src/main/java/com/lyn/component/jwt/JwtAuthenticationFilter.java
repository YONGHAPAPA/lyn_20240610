package com.lyn.component.jwt;

import java.io.IOException;
import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lyn.model.common.ApiResponse;
import com.lyn.model.common.CustomException;
import com.lyn.model.common.ErrorCode;

import io.micrometer.common.util.StringUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


//JwtAuthenticationFilter extends OncePerRequestFilter 해도 될듯한데..
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {
	
	private final JwtUtil jwtUtil;
	
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		/*
		 * Request Header에서 Authorization 의 access Token 정보추출
		 * */
		String accessToken = "";
		String authorizationToken = ((HttpServletRequest) request).getHeader("Authorization");
		
		//log.info("JwtAuthenticationFilter::authorizationToken: {}", authorizationToken);
		
		if(StringUtils.isNotEmpty(authorizationToken)  && authorizationToken.startsWith("Bearer")) {
			accessToken = authorizationToken.substring(7);	//Bearer 이후 문자열을 access Token 으로 추출한다.  
		}
		
		
		log.info("dofilter :: accessTokek:: {}", accessToken);
		Collection <? extends GrantedAuthority> roles = jwtUtil.getRoleInfoFromAccessToken(accessToken);
		
		

		/*
		 *accessToken 의 유효성 체크한다.
		 *유효할 경우 token 에서 Authentication 객체를 추출해서 SecurityContext 에 세팅처리. 
		 * */
		if(accessToken != "" && jwtUtil.validateToken(accessToken)) {
			Authentication authentication = jwtUtil.getAuthentication(accessToken);
			
//			Collection<? extends GrantedAuthority> tokenRoles= authentication.getAuthorities();
//			log.info("tokenRoles", tokenRoles.toString());
			
			SecurityContextHolder.getContext().setAuthentication(authentication);

			/* 
			 *SecurityContextHolder에서 사용자 Role 정보 체크
			 */
//			Collection<SimpleGrantedAuthority> authorities = (Collection<SimpleGrantedAuthority>)SecurityContextHolder.getContext().getAuthentication().getAuthorities();
//			log.info("JwtAuthenticationFilter::doFilter: authorities: {}", authorities.toArray());
					
//			chain.doFilter(request, response);
//			return;
		}
		
		
		chain.doFilter(request, response);
		
	}
	
	/*
	 * 보안확인후 Response 객체 처리 
	 * */
	public static void setErrorResponse(HttpServletResponse response, ErrorCode errorCode) throws IOException  {
		ApiResponse<?> apiResponse = ApiResponse.fail(new CustomException(errorCode));
		ObjectMapper objectManager = new ObjectMapper();
		response.setStatus(errorCode.getHttpStatus().value());
		response.getWriter().write(objectManager.writeValueAsString(apiResponse));
	}
}
