package com.lyn.controller;

import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.lyn.model.common.ApiResponse;
import com.lyn.model.common.CustomException;
import com.lyn.model.common.ErrorCode;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice //@ControllerAdvice + @ResponseBody
public class GlobalExceptionHandler {

	/*
	 * 존재하지 않는 요청에 대한 예외처리
	 * */
	@ExceptionHandler(value={NoHandlerFoundException.class, HttpRequestMethodNotSupportedException.class})
	public ApiResponse<?>handleNoPageFoundException(Exception e){
		log.error("GlobalExceptionHandler >>> handleNoPageFoundException : {}", e.getMessage());
		return ApiResponse.fail(new CustomException(ErrorCode.NOT_FOUND_END_POINT));
	}
	
	
	/*
	 * 커스텀 예외처리
	 * */
	@ExceptionHandler(value= {CustomException.class})
	public ApiResponse<?> handleCustomException(CustomException e){
		log.error("GlobalExceptionHandler >>> handleCustomException : {}", e.getMessage());
		return ApiResponse.fail(e);
	}
	
	
	/*
	 * 기본 예외
	 * */
	@ExceptionHandler(value= {Exception.class})
	public ApiResponse<?> handleException(Exception e){
		log.error("GlobalExceptionHandler >>> handleException : {}", e.getMessage());
		return ApiResponse.fail(new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));
	}
	
	
	
}
