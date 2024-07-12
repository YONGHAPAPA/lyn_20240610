package com.lyn.model.common;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

	BAD_REQUEST(400, HttpStatus.BAD_REQUEST, "Bad Request."),
	NOT_FOUND_END_POINT(404, HttpStatus.NOT_FOUND, "Request URL doesn't exist."), 
	INTERNAL_SERVER_ERROR(500, HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error."),
	ACCESS_FORBIDDEN(403, HttpStatus.FORBIDDEN, "Authentication is required.");
	
	private final Integer code;
	private final HttpStatus httpStatus;
	private final String message;
}
