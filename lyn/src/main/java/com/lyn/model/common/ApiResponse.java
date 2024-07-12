package com.lyn.model.common;

import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonIgnore;

public record ApiResponse<T>(
		@JsonIgnore HttpStatus httpStatus,
		boolean success, 
		@Nullable T data, 
		@Nullable ExceptionDto error) 
{
	public static <T> ApiResponse<T> ok(@Nullable final T data){
		return new ApiResponse<T>(HttpStatus.OK, true, data, null);
	}
	
	public static <T> ApiResponse<T> created(@Nullable final T data){
		return new ApiResponse<>(HttpStatus.CREATED, true, data, null);
	}
	
	public static <T> ApiResponse<T> fail(final CustomException e){
		return new ApiResponse<>(e.getErrorCode().getHttpStatus(), false, null, ExceptionDto.of(e.getErrorCode()));
	}
}
