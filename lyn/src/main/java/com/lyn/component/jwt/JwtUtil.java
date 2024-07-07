package com.lyn.component.jwt;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.lyn.dto.jwt.JwtTokenDto;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;


@Component
public class JwtUtil {

	private final Key key;
	private final String grantType;
	private final long accessTokenExpTime;
	private final long refreshTokenExpTime;
	
	Logger logger = LogManager.getLogger(JwtUtil.class);
	
	/*
	 * JwtUtil 생성자
	 * 프로젝트 application.properties에서 설정된 값으로 jwt에 사용될 secretKey, expireTime 초기화
	 * */
	public JwtUtil(@Value("${jwt.secretKey}") String secretKey, @Value("${jwt.grantType}") String grantType, @Value("${jwt.accessExpTime}") long accessTokenExpTime, @Value("${jwt.refreshExpTime}") long refreshTokenExpTime) {
		
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		this.key = Keys.hmacShaKeyFor(keyBytes);
		this.grantType = grantType;
		this.accessTokenExpTime = accessTokenExpTime;
		this.refreshTokenExpTime = refreshTokenExpTime;
	}
	
	public JwtTokenDto generateToken(Authentication authentication) {
		
		String authorities = authentication.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.joining(","));
		
		ZonedDateTime now = ZonedDateTime.now();
		ZonedDateTime accessTokenValidity = now.plusSeconds(accessTokenExpTime);
		ZonedDateTime refreshTokenValidity = now.plusSeconds(refreshTokenExpTime);
		
		
		
		logger.info(String.format("authorities:: %s", authorities));
		
		
		
		//Access Token
		String accessToken = Jwts.builder()
				.setSubject(authentication.getName())
				.claim("auth", authorities)
				.setIssuedAt(Date.from(now.toInstant()))
				.setExpiration(Date.from(accessTokenValidity.toInstant()))
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();
				
		//Refresh Token
		String refreshToken = Jwts.builder()
				.setExpiration(Date.from(refreshTokenValidity.toInstant()))
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();

		return JwtTokenDto.builder()
				.grantType(this.grantType)
				.accessToken(accessToken)
				.refreshToken(refreshToken)
				.build();
	}
	
}
