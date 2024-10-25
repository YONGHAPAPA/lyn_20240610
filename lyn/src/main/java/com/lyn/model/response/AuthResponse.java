package com.lyn.model.response;

import org.springframework.lang.Nullable;
import com.lyn.dto.exception.authentication.AuthExceptionDTO;
import com.lyn.model.exception.AuthException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public record AuthResponse<T>(
		boolean success, 
		@Nullable T payload, 
		@Nullable AuthExceptionDTO error) {
	
	public static <T> AuthResponse<T> success(T payload){
		return new AuthResponse<T>(true, payload, null); 
	}
	
	public static <T> AuthResponse<T> fail(AuthException ex){
		return new AuthResponse<T>(false, null, AuthExceptionDTO.of(ex));
	}
}
