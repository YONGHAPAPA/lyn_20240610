package com.lyn.dto.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtTokenDto {
	private String grantType;
	private String accessToken;
	private String accessExpiry;
	private String refreshToken;
	private String refreshExpiry;
}
