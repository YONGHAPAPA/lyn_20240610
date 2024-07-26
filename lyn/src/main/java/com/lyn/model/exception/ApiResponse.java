package com.lyn.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lyn.model.exception.CustomException;

public record ApiResponse<T>(
		@JsonIgnore HttpStatus httpStatus, 
		boolean success, 
		@Nullable T data, 
		@Nullable ExceptionDto error) {
	
	public static <T> ApiResponse<T> ok(@Nullable final T data){
		return new ApiResponse<>(HttpStatus.OK, true, data, null);
	}
	
	public static <T> ApiResponse<T> created(@Nullable final T data){
		return new ApiResponse<>(HttpStatus.CREATED, true, data, null);
	} 
	
	public static <T> ApiResponse<T> fail(final CustomException ex){
		return new ApiResponse<>(ex.getErrorCode().getHttpStatus(), false, null, ExceptionDto.of(ex));
	}
}
