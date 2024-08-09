package com.lyn.service.authentication;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import com.lyn.dto.UserDto;
import com.lyn.dto.jwt.JwtTokenDto;

public interface AuthenticationService {
	//public String EncodePassword(String password) throws Exception;
	//public UserDto JoinUser(@Param("user") UserDto user) throws Exception;
	
	public UserDto JoinUser(UserDto user) throws Exception;
	
	public JwtTokenDto SignInUser(UserDto user) throws Exception;
	
	public boolean ValidateJwtToken(String jwtToken) throws Exception;
	
	public JwtTokenDto regenerateAccessTokenByRefreshToken(String refreshToken) throws Exception;
	
	public Collection<? extends GrantedAuthority> getUserRolesFromToken(String accessToken) throws Exception;
}
