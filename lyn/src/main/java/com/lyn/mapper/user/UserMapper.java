package com.lyn.mapper.user;

import java.util.List;

import com.lyn.dto.UserDto;

public interface UserMapper {
	
	public Integer CreateUser(UserDto user) throws Exception;
	
	public UserDto GetUserByUserName(String userName) throws Exception;

	public List<String> GetUserRoles(String userName) throws Exception;
}
