package com.lyn.service.authentication;

import com.lyn.dto.UserDto;
import com.lyn.dto.jwt.JwtTokenDto;

public interface AuthenticationService {
	//public String EncodePassword(String password) throws Exception;
	//public UserDto JoinUser(@Param("user") UserDto user) throws Exception;
	
	public UserDto JoinUser(UserDto user) throws Exception;
	
	public JwtTokenDto SignInUser(UserDto user) throws Exception;
}
