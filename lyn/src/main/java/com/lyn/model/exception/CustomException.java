package com.lyn.model.exception;

import com.lyn.model.code.ErrorCode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException {

	private final ErrorCode errorCode;
	
	public String getMessage() {
		return errorCode.getErrorMessage();
	}
}
