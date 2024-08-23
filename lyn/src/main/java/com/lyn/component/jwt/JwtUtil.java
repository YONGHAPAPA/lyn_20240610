package com.lyn.component.jwt;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.lyn.dto.jwt.JwtTokenDto;
import com.lyn.dto.jwt.JwtTokenDto.JwtTokenDtoBuilder;
import com.lyn.model.jwt.ClaimsProp;
import com.lyn.model.jwt.TokenGenKey;

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
	private final long accessTokenExpSec;
	private final long refreshTokenExpSec;
	
	Logger logger = LogManager.getLogger(JwtUtil.class);
	
	/*
	 * JwtUtil 생성자
	 * 프로젝트 application.properties에서 설정된 값으로 jwt에 사용될 secretKey, expireTime 초기화
	 * */
	public JwtUtil(@Value("${jwt.secretKey}") String secretKey, @Value("${jwt.grantType}") String grantType, @Value("${jwt.accessExpTime}") long accessTokenExpSec, @Value("${jwt.refreshExpTime}") long refreshTokenExpSec) {
		
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		this.key = Keys.hmacShaKeyFor(keyBytes);
		this.grantType = grantType;
		this.accessTokenExpSec = accessTokenExpSec;
		this.refreshTokenExpSec = refreshTokenExpSec;
	}
	
	
	/*
	 * access, refresh Token String 값을 각각 또는 한꺼번에 생성하는 함수
	 * */
	public List<Map<TokenGenKey, String>> generateTokenString(Authentication authentication, TokenGenKey tokenGenKey) {
		
		List<Map<TokenGenKey, String>> tokenList = new ArrayList<Map<TokenGenKey, String>>();
		Map<TokenGenKey, String> tokenMap = new HashMap<TokenGenKey, String>();
		
		try {
			
			ZonedDateTime now = ZonedDateTime.now();
			ZonedDateTime accessTokenExpiry = now.plusSeconds(accessTokenExpSec);
			String accExpIns = now.plusSeconds(accessTokenExpSec).toInstant().toString();
			ZonedDateTime refreshTokenExpiry = now.plusSeconds(refreshTokenExpSec);
			
			
			String str_user_roles = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(",")); 
			Claims claims = Jwts.claims().setSubject(authentication.getName());
			claims.put(ClaimsProp.USER_ROLE.name(), str_user_roles);
			
			if(tokenGenKey == TokenGenKey.ACCESS) {

				String accessToken = Jwts.builder()
						.setClaims(claims)
						.setIssuedAt(Date.from(now.toInstant()))
						.setExpiration(Date.from(accessTokenExpiry.toInstant()))
						.signWith(key, SignatureAlgorithm.HS256)
						.compact();
				
				tokenMap.put(TokenGenKey.ACCESS, accessToken);
				tokenMap.put(TokenGenKey.ACCESS_EXP_DT, Date.from(accessTokenExpiry.toInstant()).toString());
				tokenMap.put(TokenGenKey.ACCESS_EXP, String.valueOf(accessTokenExpiry.toInstant()));
				tokenList.add(tokenMap);
			}  
			
			if(tokenGenKey == TokenGenKey.REFRESH) {
				
				String refreshToken = Jwts.builder()
						.setClaims(claims)
						.setIssuedAt(Date.from(now.toInstant()))
						.setExpiration(Date.from(refreshTokenExpiry.toInstant()))
						.signWith(key, SignatureAlgorithm.HS256)
						.compact();
				
				tokenMap.put(TokenGenKey.REFRESH, refreshToken);
				tokenMap.put(TokenGenKey.REFRESH_EXP_DT, Date.from(refreshTokenExpiry.toInstant()).toString());
				tokenMap.put(TokenGenKey.REFRESH_EXP, String.valueOf(refreshTokenExpiry.toInstant()));
				tokenList.add(tokenMap);
			}
			
			if(tokenGenKey == TokenGenKey.ALL) {
				//token test
//				Date temp = Date.from(accessTokenExpiry.toInstant());
				log.info("generateTokenString:accessTokenExpiry.toInstant >>>> {}", accessTokenExpiry.toInstant());
				log.info("generateTokenString:accExpIns.now.toInstant >>>> {}", now.toInstant());
				
//				log.info("temp >>>> {}", temp.toString());
				
				String accessToken = Jwts.builder()
						.setClaims(claims)
						.setIssuedAt(Date.from(now.toInstant()))
						.setExpiration(Date.from(accessTokenExpiry.toInstant()))
						.signWith(key, SignatureAlgorithm.HS256)
						.compact();
				
				tokenMap.put(TokenGenKey.ACCESS, accessToken);
				tokenMap.put(TokenGenKey.ACCESS_EXP_DT, Date.from(accessTokenExpiry.toInstant()).toString());
				tokenMap.put(TokenGenKey.ACCESS_EXP, String.valueOf(accessTokenExpiry.toInstant()));
				
				String refreshToken = Jwts.builder()
						.setClaims(claims)
						.setIssuedAt(Date.from(now.toInstant()))
						.setExpiration(Date.from(refreshTokenExpiry.toInstant()))
						.signWith(key, SignatureAlgorithm.HS256)
						.compact();
				
				tokenMap.put(TokenGenKey.REFRESH, refreshToken);
				tokenMap.put(TokenGenKey.REFRESH_EXP_DT, Date.from(refreshTokenExpiry.toInstant()).toString());
				tokenMap.put(TokenGenKey.REFRESH_EXP, String.valueOf(refreshTokenExpiry.toInstant()));
				tokenList.add(tokenMap);
			}
		} catch(Exception e) {
			log.error("${this.getClass().getName()}");
			tokenList = null;
		}
		
		return tokenList;
	}
	
	
	
	/*
	 * 인증처리된(AuthManagerBuilder.authenticate) Authentication 객체로 JWT Token 을 생성한다.  
	 */
	public JwtTokenDto generateFullToken(Authentication authentication) {
		/*
		 * Role 정보 String로 token에 설정
		 * (참고)전달받는 매개변수 authentication 은 authManagerBuilder.getObject().authenticate(userToken); 처리될때  
		 * */
		
		List<Map<TokenGenKey, String>> newTokenList = generateTokenString(authentication, TokenGenKey.ALL);
		
		String accessToken = "";
		String refreshToken = "";
		String roles = "";
		
		JwtTokenDtoBuilder tokenBuilder = JwtTokenDto.builder();
		tokenBuilder.grantType(this.grantType);
		
		roles = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));
		
		for(Map token: newTokenList) {
			if(token.containsKey(TokenGenKey.ACCESS)) {
				accessToken = (String)token.get(TokenGenKey.ACCESS);
				//log.info("generateTokenString ACCESS_EXP >>>> {}", token.get(TokenGenKey.ACCESS_EXP));
				//log.info("generateTokenString ACCESS_EXP_DT >>>> {}", token.get(TokenGenKey.ACCESS_EXP_DT));
				tokenBuilder.accessToken(accessToken).accessExpiry(String.valueOf(token.get(TokenGenKey.ACCESS_EXP))).roles(roles);
			}
			
			if(token.containsKey(TokenGenKey.REFRESH)) {
				refreshToken = (String)token.get(TokenGenKey.REFRESH);
				tokenBuilder.refreshToken(refreshToken).refreshExpiry(String.valueOf(token.get(TokenGenKey.REFRESH_EXP)));
				//log.info("generateTokenString refreExp >>>> {}", String.valueOf(token.get(TokenGenKey.REFRESH_EXP)));
			}
		}
		
		return tokenBuilder.build();
	}
	
	
	public JwtTokenDto generateAccessToken(Authentication authentication) {
		
		JwtTokenDtoBuilder tokenBuilder = JwtTokenDto.builder();
		tokenBuilder.grantType(this.grantType);
		
		List<Map<TokenGenKey, String>> newTokenList = generateTokenString(authentication, TokenGenKey.ACCESS);
		String roles = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));
		
		for(Map token: newTokenList) {
			if(token.containsKey(TokenGenKey.ACCESS)) {
				tokenBuilder.accessToken(String.valueOf(token.get(TokenGenKey.ACCESS))).accessExpiry(String.valueOf(token.get(TokenGenKey.ACCESS_EXP))).roles(roles);
			}
		}
		
		return tokenBuilder.build();
	}
	
	
	
	
	/*
	 * jwt Refresh Token 유효성 검증
	 * */
	public boolean validateRefreshToken(String jwtRefreshToken) {

		try {
			Jwts.parserBuilder()
			.setSigningKey(key)
			.build()
			.parseClaimsJws(jwtRefreshToken);
			return true;
		} catch(SecurityException | MalformedJwtException e) {
			logger.error(String.format("Invalid Refresh Token :: %s", e.getMessage()));
		} catch(ExpiredJwtException e) {
			logger.error(String.format("Expired Refresh Token :: %s", e.getMessage()));
			//throw e;
		} catch(UnsupportedJwtException e) {
			logger.error(String.format("Unsupported Refresh Token :: %s", e.getMessage()));
		} catch(IllegalArgumentException e) {
			logger.error(String.format("Refresh JWT Claims string is empty :: %s", e.getMessage()));
		}
		
		return false;
	}
	
	/*
	 * jwt Access Token 유효성 검증
	 * */
	public boolean validateAccessToken(String jwtAccessToken) {

		try {
			Jwts.parserBuilder()
			.setSigningKey(key)
			.build()
			.parseClaimsJws(jwtAccessToken);
			return true;
			
		} catch(SecurityException | MalformedJwtException e) {
			logger.error(String.format("Invalid Access Token :: %s", e.getMessage()));
		} catch(ExpiredJwtException e) {
			logger.error(String.format("Expired Access Token :: %s", e.getMessage()));
			//throw e;
		} catch(UnsupportedJwtException e) {
			logger.error(String.format("Unsupported Access Token :: %s", e.getMessage()));
		} catch(IllegalArgumentException e) {
			logger.error(String.format("JWT Access Claims string is empty :: %s", e.getMessage()));
		}
		
		return false;
	}
	
	
	
	public boolean isExpiredAccessToken(String jwtAccessToken) {
		
		boolean expired = false;
		
		try {
			DecodedJWT decodedJWT = JWT.decode(jwtAccessToken);
			Date expiresAt = decodedJWT.getExpiresAt();
			expired = expiresAt.before(new Date());
			log.info("isExpiredAccessToken >>>>>> jwtAccessToken : {} decodedJWT: {}, expiredAt:{}, expired:{} ", jwtAccessToken, decodedJWT, expiresAt.toString(), expired);
		} catch(JWTDecodeException e) {
			log.error("isExpiredToken >>> {}", e.getMessage());
		}
		
		return expired;
	}
	
	 
	
	
	/*
	 * JWT Token 에서 Authentication 객체 추출
	 * */
	public Authentication getAuthenticationFromJwtToken(String jwtToken) {
		Claims claims = null;
		
		try {
				claims = Jwts.parserBuilder()
					.setSigningKey(key)
					.build()
					.parseClaimsJws(jwtToken)
					.getBody();
				
				if(claims.get(ClaimsProp.USER_ROLE.name()) == null) {
					throw new RuntimeException("권한 정보가 없는 토큰입니다.");
				}
				 
				
				/*
				 * Claims 에서 권한정보 추출하기
				 * */
				//log.info("getAuthentication::auth >> ", claims.get("auth").toString());
				Collection<? extends GrantedAuthority> authorities = Arrays.stream(claims.get(ClaimsProp.USER_ROLE.name()).toString().split(","))
						.map(SimpleGrantedAuthority::new)
						.collect(Collectors.toList());

				/*
				 * UserDetails 객체를 생성해서 Authentication 객체로 리턴
				 * UserDetails > 인터페이스/ User > UserDetails를 구현한 클래스
				 * 권한정보를 Authentication 객체에 넣어 준다?
				 * */
				UserDetails principal = new User(claims.getSubject(), "", authorities);	
				return new UsernamePasswordAuthenticationToken(principal, "", authorities);	//인증되지 않은 authentication 객체 생성 클래스
				
		} catch(ExpiredJwtException e) {
			logger.error(String.format("Expired JWT :: %s", e.getMessage()));
			return (Authentication) e.getClaims();
		}
	}
	
	
	/*
	 * Access Token에서 Role정보(권한) 가져오기
	 * */
	public Collection<? extends GrantedAuthority> getRoleInfoFromToken(String jwtToken) {
		
		Collection<? extends GrantedAuthority> authorities = null;
		
		try {
			
			if(jwtToken != "") {
			
				Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwtToken).getBody();
				String user_role = claims.get(ClaimsProp.USER_ROLE.name()).toString();
				
				//log.info("JwtUtil::getRoleInfoFromAccessToken:user_role {}", user_role);
				
				authorities = Arrays.stream(user_role.split(",")).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
			}
		} catch(Exception ex) {
			log.error(this.getClass().getName() + "::getRoleInfoFromAccessToken: {}", ex.getMessage());
			authorities = null;
		}
		
		return authorities;
	}
	
	
	public String getUserIdFromToken(String jwtToken) {

		String userId = "";
		
		try {
			
			Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwtToken).getBody();
			userId = claims.getSubject();
			
		}catch(Exception e) {
			log.error("[getUserIdFromToken] : {}", e.getMessage());
		}
		
		return userId;
	} 
	
}
