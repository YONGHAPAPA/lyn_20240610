package com.lyn.model.common;


import com.lyn.model.code.ErrorCode;
import com.lyn.model.exception.CustomException;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
public class ExceptionDto {

	private final ErrorCode code;
	private final String message;
	
	/*
	 * public ExceptionDto(ErrorCode errorCode) { this.code = errorCode.getCode();
	 * this.message = errorCode.getMessage(); }
	 * 
	 * public static ExceptionDto of(ErrorCode errorCode) { return new
	 * ExceptionDto(errorCode); }
	 */
	
	public ExceptionDto(CustomException ex) {
		this.code = ex.getErrorCode();
		this.message = ex.getMessage();
	}
	
	public static ExceptionDto of(CustomException ex) {
		return new ExceptionDto(ex);
	}
}
