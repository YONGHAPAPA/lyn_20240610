package com.lyn.model.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
	BAD_REQUEST(40000, HttpStatus.BAD_REQUEST, "This is bad request"),
	UNAUTHORIZED(40100, HttpStatus.UNAUTHORIZED, "Access Token is Unauthorized(Invalid/Expired/Unsupported/Empty)"),
	USER_NOT_FOUND(40101, HttpStatus.UNAUTHORIZED, "User is not found"),
	USER_PWD_NOT_MATCHED(40102, HttpStatus.UNAUTHORIZED, "User password is incorrected"), 
	USER_CREDENTIAL_ERROR(40103, HttpStatus.UNAUTHORIZED, "Bad Credentials"),
	REFRESH_TOKEN_INVALID(40104, HttpStatus.UNAUTHORIZED, "Refresh Token is invalid"),
	ACCESS_TOKEN_INVALID(40105, HttpStatus.UNAUTHORIZED, "Access Token is invalid"),
	ACCESS_TOKEN_NULL(40106, HttpStatus.UNAUTHORIZED, "Access Token is null"), 
	ACCESS_FORBIDDEN(40300, HttpStatus.FORBIDDEN, "Token is unauthorized or forbidden"),
	NOT_FOUND_API(40401, HttpStatus.NOT_FOUND, "Request API is not found"), 
	INTERNAL_SERVER_ERROR(5000, HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error");
	
	private final Integer errorCode;
	private final HttpStatus httpStatus;
	private final String errorMessage;
}
