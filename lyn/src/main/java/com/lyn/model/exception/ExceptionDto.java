package com.lyn.model.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class ExceptionDto {

	private final ErrorCode code;
	private final String message;
	
	private ExceptionDto(CustomException exception) {
		this.code = exception.getErrorCode();
		this.message = exception.getErrorMessage();
	}
	
	public static ExceptionDto of(CustomException exception) {
		return new ExceptionDto(exception);
	}
}
