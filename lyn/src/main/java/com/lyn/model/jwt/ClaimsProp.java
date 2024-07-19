package com.lyn.model.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ClaimsProp {
	USER_ROLE("USER_ROLE"), 
	USER_AUTH("USER_AUTH");
	
	private final String propName;
}
