package com.lyn.model.common;

import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.lyn.model.exception.CustomException;
import com.lyn.model.code.ErrorCode;
import com.lyn.model.common.ExceptionDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public record ApiResponse<T>(
		@JsonIgnore HttpStatus httpStatus,
		boolean success, 
		@Nullable T data, 
		@Nullable ExceptionDto error
		//@Nullable String customErrorCode
		) 
{
	public static <T> ApiResponse<T> ok(@Nullable final T data){
		return new ApiResponse<T>(HttpStatus.OK, true, data, null);
	}
	
	public static <T> ApiResponse<T> created(@Nullable final T data){
		return new ApiResponse<>(HttpStatus.CREATED, true, data, null);
	}
	
	public static <T> ApiResponse<T> fail(final CustomException e){
		//log.info("ApiResponse:: e.getErrorCode().toString() {}", e.getErrorCode().toString());
		return new ApiResponse<>(e.getErrorCode().getHttpStatus(), false, null, ExceptionDto.of(e));
	}
}
