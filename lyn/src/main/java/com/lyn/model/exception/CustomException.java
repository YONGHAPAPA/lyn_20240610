package com.lyn.model.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException {

	private final ErrorCode errorCode;
	
	
	public String getErrorMessage() {
		return errorCode.getErrorMessage();
	}
}
