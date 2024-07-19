package com.lyn.component.jwt;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.lyn.dto.jwt.JwtTokenDto;
import com.lyn.model.jwt.ClaimsProp;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;


@Slf4j
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

		/*
		 * Role 정보 String로 token에 설정
		 * */
		String user_role = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));
		//최초 token 생성시점에서는 authorities 정보는 없음
		log.info("JwtUtil::generateToken: authorities: {}", user_role);

		ZonedDateTime now = ZonedDateTime.now();
		ZonedDateTime accessTokenValidity = now.plusSeconds(accessTokenExpTime);
		ZonedDateTime refreshTokenValidity = now.plusSeconds(refreshTokenExpTime);
		
		//logger.info(String.format("authorities:: %s", authorities));
		Claims claims = Jwts.claims().setSubject(authentication.getName()); //JWT Payload 데이터
		claims.put(ClaimsProp.USER_ROLE.name(), user_role);	//User Role info
		
		//Access Token
		String accessToken = Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(Date.from(now.toInstant()))	//Token 발행시간
				.setExpiration(Date.from(accessTokenValidity.toInstant()))	//Token 유효시간
				.signWith(key, SignatureAlgorithm.HS256)	//암호화 알고리즘, key는 accessToken, resfreshToken 각각 다르게 설정하기도 함
				.compact();
				
		//Refresh Token
		String refreshToken = Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(Date.from(now.toInstant()))
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
	 * Refresh Token 유효성 체크
	 * */
	 
	
	
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
		
		
		//log.info("getAuthentication::auth >> ", claims.get("auth").toString());
		
		Collection<? extends GrantedAuthority> authorities = Arrays.stream(claims.get("auth").toString().split(","))
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());
		

//		Collection<? extends GrantedAuthority> authorities = Arrays.stream("ADMIN,USER".split(","))
//				.map(SimpleGrantedAuthority::new)
//				.collect(Collectors.toList());
		
		
		/*
		 * UserDetails 객체를 생성해서 Authentication 객체로 리턴
		 * UserDetails > 인터페이스/ User > UserDetails를 구현한 클래스
		 * 권한정보를 Authentication 객체에 넣어 준다?
		 * */
		UserDetails principal = new User(claims.getSubject(), "", authorities);	
		return new UsernamePasswordAuthenticationToken(principal, "", authorities);
	}
	
	
	/*
	 * Access Token에서 Role정보(권한) 가져오기
	 * */
	public Collection<? extends GrantedAuthority> getRoleInfoFromAccessToken(String accessToken) {
		
		Collection<? extends GrantedAuthority> authorities;
		
		try {
			
			Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
			String user_role = claims.get(ClaimsProp.USER_ROLE.name()).toString();
			
			//log.info("JwtUtil::getRoleInfoFromAccessToken:user_role {}", user_role);
			
			authorities = Arrays.stream(user_role.split(",")).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
			
		} catch(Exception ex) {
			log.error(this.getClass().getName() + "::getRoleInfoFromAccessToken: {}", ex.getMessage());
			authorities = null;
		}
		
		return authorities;
	}
	
}
