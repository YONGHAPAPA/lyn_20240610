package com.lyn.controller.authentication;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lyn.dto.UserDto;
import com.lyn.dto.jwt.JwtTokenDto;
import com.lyn.mapper.user.UserMapper;
import com.lyn.model.common.ApiResponse;
import com.lyn.model.exception.CustomException;
import com.lyn.model.exception.ErrorCode;

import com.lyn.service.authentication.AuthenticationService;

import io.micrometer.common.util.StringUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
	
	@Value("${jwt.grantType}")
	private String grantType;
	
	@Value("${jwt.accessExpTime}")
	private String accessTokenExpSec;
	
	@Value("${jwt.refreshExpTime}")
	private String refreshTokenExpSec;
	

//	@Autowired
//	DataSource dataSource;
	
//	@Autowired
//	SqlSession sqlSession;
	
	@Autowired
	AuthenticationService authService;
	
	
	@PostMapping("/AuthTest")
	public ResponseEntity<String> AuthTest(@RequestParam(required=true, value="key") String key, @RequestParam(required=true, value="key") String value){
	
		
		return ResponseEntity.ok("AuthTest OK~~~~");
	}
	

	@PostMapping("/LoginUser")
	public ApiResponse<?> LoginUser(HttpServletResponse response, @RequestParam(required=true, value="userEmail") String userEmail, @RequestParam(required=true, value="userPassword") String userPassword){
		
		JwtTokenDto tokenDto = null;
		//logger.info(String.format("/LoginUser : %s : %s", userEmail, userPassword));
		
		UserDto loginUser = new UserDto();
		loginUser.setUser_email(userEmail);
		loginUser.setUser_pwd(userPassword);
		
		try {
			tokenDto = authService.SignInUser(loginUser);
			
			log.info("access Token: {}", tokenDto.getAccessToken());
			log.info("refresh Token: {}", tokenDto.getRefreshToken());
			log.info("grant type: {}", tokenDto.getGrantType());
			
			//refreshToken 은 Http-Secure Cookie로 전달.
			Cookie cookie = new Cookie("refreshToken", tokenDto.getRefreshToken());
			cookie.setMaxAge(Integer.parseInt(refreshTokenExpSec));	//Secure Http Cookie Expiry - refreshToken Expiry 로 설정(현재 60sec)
			cookie.setHttpOnly(true);
			cookie.setSecure(true);
			response.addCookie(cookie);
			
		} catch (Exception e) {
			if(e instanceof UsernameNotFoundException) {
				return ApiResponse.fail(new CustomException(ErrorCode.USER_NOT_FOUND));
			} else if (e instanceof BadCredentialsException) {
				return ApiResponse.fail(new CustomException(ErrorCode.USER_PWD_NOT_MATCHED));
			} else {
				return ApiResponse.fail(new CustomException(ErrorCode.USER_CREDENTIAL_ERROR));
			}
		}
		
		return ApiResponse.ok(tokenDto);
	}
	
	
	@PostMapping("/SlientLogin")
	public ApiResponse<?> SlientLogin(HttpServletRequest request){
		
		JwtTokenDto tokenDto = new JwtTokenDto();
		String authorizationToken = "";
		String accessToken = "";
		String refreshToken = "";
		
		try {
			
			/*
			 * Access Token 확인, 유효하면 재발급은 하지 않도록 처리함
			 * */
			authorizationToken = request.getHeader("Authorization");
			
			log.info("authorizationToken: {}", authorizationToken);
			
			if(StringUtils.isEmpty(authorizationToken)) {
				return ApiResponse.fail(new CustomException(ErrorCode.ACCESS_TOKEN_INVALID));
			}
			
			
			
			if(StringUtils.isNotEmpty(authorizationToken) && authorizationToken.startsWith("Bearer")) {
				accessToken = authorizationToken.substring(7);
			}
			
			
			
			
			if(StringUtils.isNotEmpty(accessToken)) {
				if(!authService.ValidateJwtToken(accessToken)) {
					//RefreshToken 확인
					Cookie[] cookies = request.getCookies();
					if(cookies != null) {
						
						for(Cookie cookie : cookies) {
							
							log.info("AuthenticationController::SlientLogin: {}", cookie.getName()) ;
							
							if(cookie.getName().equalsIgnoreCase("refreshToken")) {
								refreshToken = cookie.getValue();
								break;
							}
						}
					}
					
					//RefreshToken 유효성 검사후 access token 재발급, 유효시간은 발급시점부터 새로 갱신
					if(refreshToken != "" && authService.ValidateJwtToken(refreshToken)) {
						accessToken = authService.regenerateAccessTokenByRefreshToken(refreshToken);
						//log.info("/SlientLogin:: accessToken: {}", accessToken);
						tokenDto.setGrantType(grantType);
						tokenDto.setAccessToken(accessToken);
						tokenDto.setAccessExpiry(accessTokenExpSec); 
					} else {
						return ApiResponse.fail(new CustomException(ErrorCode.REFRESH_TOKEN_INVALID));
					}
				} else {
					
					//유효한 accessToken 이면 재발급하지 않음.
					tokenDto.setGrantType(grantType);
					tokenDto.setAccessToken(accessToken);
					tokenDto.setAccessExpiry(accessTokenExpSec);
				}
			}
		} catch(Exception ex) {
			log.error("AuthenticationController::SlientLogin: {}", ex.getMessage());
		}
		
		return ApiResponse.ok(tokenDto);
	}
	
	@PostMapping("/JoinUser")
	public String JoinUser(@RequestParam(required=true, value="userEmail") String userEmail, @RequestParam(required=true, value="userPassword") String userPassword) {
		
		String result = "";
		UserDto newUser = new UserDto();
		newUser.setUser_email(userEmail);
		newUser.setUser_pwd(userPassword);
		
		try {
			authService.JoinUser(newUser);
			result = "User Join Success";
		} catch(Exception e) {
			result = String.format("User Join Failed::%s", e.getMessage());
		}
		
		return result;
	}
	
	
	
	/*
	 * DB Connection 테스트  
	 * */
	/*
	private Boolean ConnectionTest() {
		
		String result = "";
		String sql = "select * from users limit 10";
		
		try{
			ResultSet rs = dataSource.getConnection().prepareStatement(sql).executeQuery();
			
			while(rs.next()) {
				result += String.format("%s", rs.getString("user_name"));
			}
		} catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		
		System.out.println(String.format("### DB Connection is successful ###\r\n### RESULT : %s", result));
		return true;
	}
	*/
}
