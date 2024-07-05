package com.lyn.service.authentication;

import org.apache.ibatis.annotations.Param;

import com.lyn.dto.UserDto;
import com.lyn.dto.jwt.JwtTokenDto;

public interface IAuthenticationService {

	//public String EncodePassword(String password) throws Exception;
	
	public UserDto JoinUser(@Param("user") UserDto user) throws Exception;
	
}
