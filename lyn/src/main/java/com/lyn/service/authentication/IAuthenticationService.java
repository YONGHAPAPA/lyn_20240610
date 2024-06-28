package com.lyn.service.authentication;

import org.apache.ibatis.annotations.Param;

import com.lyn.dto.UserDto;

public interface IAuthenticationService {

	//public String EncodePassword(String password) throws Exception;
	
	public void JoinUser(@Param("user") UserDto user) throws Exception;
	
}
