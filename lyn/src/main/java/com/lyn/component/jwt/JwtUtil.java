package com.lyn.component.jwt;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.lyn.dto.jwt.JwtTokenDto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;


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
		
		//logger.info(String.format("authorities:: %s", authorities));

		
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
	
	/*
	 * access Token 유효성 검증
	 * */
	public boolean validateToken(String accessToken) {

		try {
			Jwts.parserBuilder()
			.setSigningKey(key)
			.build()
			.parseClaimsJws(accessToken);
			return true;
		} catch(SecurityException | MalformedJwtException e) {
			logger.error(String.format("Invalid JWT Token :: %s", e.getMessage()));
		} catch(ExpiredJwtException e) {
			logger.error(String.format("Expired JWT Token :: %s", e.getMessage()));
		} catch(UnsupportedJwtException e) {
			logger.error(String.format("Unsupported JWT Token :: %s", e.getMessage()));
		} catch(IllegalArgumentException e) {
			logger.error(String.format("JWT Claims string is empty :: %s", e.getMessage()));
		}
		
		return false;
	}
	
	
	/*
	 * access Token 에서 Authentication 객체 추출
	 * */
	public Authentication getAuthentication(String accessToken) {
		Claims claims = null;
		
		try {
				claims = Jwts.parserBuilder()
					.setSigningKey(key)
					.build()
					.parseClaimsJws(accessToken)
					.getBody();
		} catch(ExpiredJwtException e) {
			logger.error(String.format("Expired JWT :: %s", e.getMessage()));
			return (Authentication) e.getClaims();
		}
		
		
		if(claims.get("auth") == null) {
			throw new RuntimeException("권한 정보가 없는 토큰입니다.");
		}
		
		
		/*
		 * Claims 에서 권한정보 추출하기
		 * */
		Collection<? extends GrantedAuthority> authorities = Arrays.stream(claims.get("auth").toString().split(","))
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());
		
		
		/*
		 * UserDetails 객체를 생성해서 Authentication 객체로 리턴
		 * UserDetails > 인터페이스/ User > UserDetails를 구현한 클래스
		 * */
		UserDetails principal = new User(claims.getSubject(), "", authorities);
		return new UsernamePasswordAuthenticationToken(principal, "", authorities);
	}
	
}
