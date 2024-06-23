package com.lyn.mapper.user;

import java.util.List;

import com.lyn.dto.UserDto;

public interface UserMapper {
	
	public Integer CreateUser(UserDto user) throws Exception;

	public List<String> GetUserRoles(String userId) throws Exception;
}
