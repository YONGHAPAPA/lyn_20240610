package com.lyn.model.common;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
	BAD_REQUEST(40000, HttpStatus.BAD_REQUEST, "Bad Request."),
	UNAUTHORIZED(40100, HttpStatus.UNAUTHORIZED, "UnAuthorized."),
	USER_NOT_FOUND(40101, HttpStatus.UNAUTHORIZED, "User not found."),
	USER_PWD_UNMATCH(40102, HttpStatus.UNAUTHORIZED, "Password is incorrect."),
	USER_CREDENTIAL_ERROR(40103, HttpStatus.UNAUTHORIZED, "Bad credentials."),
	NOT_FOUND_END_POINT(40400, HttpStatus.NOT_FOUND, "Request URL doesn't exist."), 
	INTERNAL_SERVER_ERROR(50000, HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error."),
	ACCESS_FORBIDDEN(40300, HttpStatus.FORBIDDEN, "Authentication is required.");
	
	private final Integer code;
	private final HttpStatus httpStatus;
	private final String message;
	
	
}
