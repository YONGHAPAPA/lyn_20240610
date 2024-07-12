package com.lyn.controller;

import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import com.lyn.model.common.ApiResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class ResponseInterceptor implements ResponseBodyAdvice {

	@Override
	public boolean supports(MethodParameter returnType, Class converterType) {

		/*
		 * 현재 세션의 요청이 beforeBodyWrite 로 처리될 요청이 맞는지 여부를 처리해주는 메서드.
		 * 모든 요청의 대한 모든 Response 처리를 할것으로 true 로 반환되도록 처리 
		 * */
		return true;
	}

	@Override
	public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
			Class selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
		
		
		/* 2024.07.12
		 * 인증처리시 보안 필터에서 차단되서 처리되어 나가는 Response에는 적용이 안되네.
		 * */
		
//		log.info("beforeBodyWrite >> body :: ", body.toString());
//		log.info("beforeBodyWrite >> returnType :: ", returnType.toString());
//		log.info("beforeBodyWrite >> response :: ", response.toString());

		/*
		 * 응답되는 Response 타입 클래스가 ApiResponse 일경우 Response 객체에 설정처리 해줌.
		 * */
		if(returnType.getParameterType() == ApiResponse.class) {
			HttpStatus status = ((ApiResponse<?>) body).httpStatus();
			response.setStatusCode(status);
		}
		
		return body;
	}

}
