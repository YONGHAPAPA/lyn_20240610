package com.lyn.dto.exception.authentication;

import com.lyn.model.code.authError.AuthErrorCode;
import com.lyn.model.exception.AuthException;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Getter
public class AuthExceptionDTO {

	final AuthErrorCode code;
	final String message;
	
	private AuthExceptionDTO(AuthException ex) {
		this.code = ex.getAuthErrorCode();
		this.message = ex.getMessage();
	}
	
	public static AuthExceptionDTO of(AuthException ex) {
		return new AuthExceptionDTO(ex);
	}
}
