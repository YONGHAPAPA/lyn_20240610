package com.lyn.dto;

import lombok.Data;

@Data
public class UserDto {
	private Integer userSeq;
	private String userEmail;
	private String userPassword;
	private String userRoleGroup;
	private String createUserId;
	
}
