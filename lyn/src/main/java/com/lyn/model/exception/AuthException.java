package com.lyn.model.exception;

import com.lyn.model.code.authError.AuthErrorCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthException extends RuntimeException {

	private final AuthErrorCode authErrorCode;
	
	public String getMessage() {

		/*
		 * enum은 메서드 안에서 getter 가 호출이 가능하네... 
		 * */
		return authErrorCode.getMessage();
	}
	 
}
