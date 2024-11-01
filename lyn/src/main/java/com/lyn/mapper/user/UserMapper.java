package com.lyn.mapper.user;

import java.util.List;

import com.lyn.dto.user.UserDto;

public interface UserMapper {
	
	public Integer CreateUser(UserDto user) throws Exception;
	
	public UserDto GetUserByUserEmail(String userEmail) throws Exception;

	public List<String> GetUserRoles(String userName) throws Exception;
	
	public Integer SetUserLogoutTime(String userEmail) throws Exception;
}
