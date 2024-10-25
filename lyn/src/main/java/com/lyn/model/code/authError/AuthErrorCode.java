package com.lyn.model.code.authError;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AuthErrorCode {
	
	BAD_REQUEST(40001, HttpStatus.BAD_REQUEST, "Request fail for bad request."), 
	UNAUTHORIZED(40102, HttpStatus.UNAUTHORIZED, "Your session is unauthorized"), 
	USER_NOT_FOUND(40103, HttpStatus.UNAUTHORIZED, "User ID is not found"), 
	USER_PASSWORD_UNMATCH(40104, HttpStatus.UNAUTHORIZED, "User password is not matched");
	
	final Integer code;
	final HttpStatus httpStatus;
	final String message;
}
