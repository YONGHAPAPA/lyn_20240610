package com.lyn.model.common;


import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
public class ExceptionDto {

	private final Integer code;
	private final String message;
	
	public ExceptionDto(ErrorCode errorCode) {
		this.code = errorCode.getCode();
		this.message = errorCode.getMessage();
	}
	
	public static ExceptionDto of(ErrorCode errorCode) {
		return new ExceptionDto(errorCode);
	}
}
