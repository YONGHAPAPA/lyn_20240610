package com.lyn.model.jwt;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TokenGenerateType {
	ALL("ALL", "for Access and Refresh token"), 
	ACCESS("ACCESS", "for only Access token"), 
	REFRESH("REFRESH", "for only Refresh token");
	
	private final String genTokenType;
	private final String description;
}
