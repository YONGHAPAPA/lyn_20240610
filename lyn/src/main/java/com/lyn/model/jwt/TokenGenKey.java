package com.lyn.model.jwt;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TokenGenKey {
	ALL("ALL", "for Access and Refresh token"), 
	ACCESS("ACCESS", "for only Access token"), 
	REFRESH("REFRESH", "for only Refresh token"),
	ACCESS_EXP_DT("ACCESS_EXP_DT", "Access token expire date"),
	ACCESS_EXP("ACCESS_EXP", "Access token expire instance"),
	REFRESH_EXP_DT("REFRESH_EXP_DT", "Refresh token expire date"), 
	REFRESH_EXP("REFRESH_EXP", "Refresh token expire instance");
	
	private final String genTokenKey;
	private final String description;
}
