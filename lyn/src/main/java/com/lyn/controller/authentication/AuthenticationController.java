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

import com.lyn.dto.user.UserDto;
import com.lyn.dto.exception.authentication.AuthExceptionDTO;
import com.lyn.dto.jwt.JwtTokenDto;
import com.lyn.mapper.user.UserMapper;
import com.lyn.model.code.ErrorCode;
import com.lyn.model.code.authError.AuthErrorCode;
import com.lyn.model.common.ApiResponse;
import com.lyn.model.exception.AuthException;
import com.lyn.model.exception.CustomException;
import com.lyn.model.response.AuthResponse;
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
	public AuthResponse<?> LoginUser(HttpServletResponse response, @RequestParam(required=true, value="email") String email, @RequestParam(required=true, value="password") String password){
		
		JwtTokenDto tokenDto = null;
		//logger.info(String.format("/LoginUser : %s : %s", userEmail, userPassword));
		
		UserDto loginUser = new UserDto();
		loginUser.setUser_email(email);
		loginUser.setUser_pwd(password);
		
		try {
			
			//log.info("LoginUser start....");
			
			
			tokenDto = authService.SignInUser(loginUser);
			
			//log.info("access Token: {}", tokenDto.getAccessToken());
			//log.info("refresh Token: {}", tokenDto.getRefreshToken());
			//log.info("grant type: {}", tokenDto.getGrantType());
			
			/*
			 * refreshToken 은 Http-Secure Cookie로 전달. 
			 * refreshToken Expiry 로 현재 60초 설정
			 * secure cookie 유효기간이 지나면 client session으로 별도로 처리를 해야하나??
			 * */
			//
			Cookie cookie = new Cookie("refreshToken", tokenDto.getRefreshToken());
			cookie.setMaxAge(Integer.parseInt(refreshTokenExpSec));	//Secure Http Cookie Expiry - refreshToken Expiry 로 설정(현재 60sec)
			cookie.setHttpOnly(true);
			cookie.setSecure(true);
			response.addCookie(cookie);
			
			
		} catch (Exception e) {
			if(e instanceof UsernameNotFoundException) {
				//return ApiResponse.fail(new CustomException(ErrorCode.USER_NOT_FOUND));
				return AuthResponse.fail(new AuthException(AuthErrorCode.USER_NOT_FOUND));
			} else if (e instanceof BadCredentialsException) {
				
				
				AuthException ex = new AuthException(AuthErrorCode.USER_PASSWORD_UNMATCH);
				AuthErrorCode authErrorCode = ex.getAuthErrorCode();
				String authErrorMessage = ex.getMessage();
				log.info("authErrorCode {}, {}, {}", authErrorCode.getCode(), authErrorCode.getMessage(), authErrorMessage);
				
				AuthResponse<?> res = AuthResponse.fail(ex);
				log.info("res: {}", res.toString());
				
				
				
				return res;
				//return ApiResponse.fail(new CustomException(ErrorCode.USER_PWD_NOT_MATCHED));
				
				
				
				
				
				//return AuthResponse.fail(new AuthException(AuthErrorCode.USER_PASSWORD_UNMATCH));
			} else {
				//return ApiResponse.fail(new CustomException(ErrorCode.USER_CREDENTIAL_ERROR));
				return AuthResponse.fail(new AuthException(AuthErrorCode.UNAUTHORIZED));
			}
		}
		
		//return ApiResponse.ok(tokenDto);
		return AuthResponse.success(tokenDto);
	}
	
	
	@PostMapping("/SlientLogin")
	public ApiResponse<?> SlientLogin(HttpServletRequest request){
		
		
		log.info("SlientLogin >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
		
		JwtTokenDto tokenDto = new JwtTokenDto();
		String authorizationToken = "";
		String accessToken = "";
		String refreshToken = "";
		
		try {
			
			/*
			 * Access Token 확인, 유효하면 재발급은 하지 않도록 처리함
			 * */
			authorizationToken = request.getHeader("Authorization");
			
			//log.info("authorizationToken: {}", authorizationToken);
			
			if(StringUtils.isEmpty(authorizationToken)) {
				
				
				
				return ApiResponse.fail(new CustomException(ErrorCode.ACCESS_TOKEN_INVALID));
			}
			
			if(StringUtils.isNotEmpty(authorizationToken) && authorizationToken.startsWith("Bearer")) {
				accessToken = authorizationToken.substring(7);
			}
			
			if(StringUtils.isNotEmpty(accessToken)) {
				
				//Access token 유효일 체크
				authService.isExpiredAccessToken(accessToken);
				
				//if(!authService.ValidateJwtToken(accessToken)) {
				if(authService.isExpiredAccessToken(accessToken)) {
					
					//RefreshToken Cookie 확인
					Cookie[] cookies = request.getCookies();
					if(cookies != null) {
						
						for(Cookie cookie : cookies) {
							//log.info("AuthenticationController::SlientLogin: {} : {}", cookie.getName(), cookie.getValue()) ;
							
							if(cookie.getName().equalsIgnoreCase("refreshToken")) {
								refreshToken = cookie.getValue();
								//log.info("Cookie::refreshToken: {}", refreshToken) ;
								break;
							}
						}
					}
					
					
					//log.info("refreshToken >>>>> {}", refreshToken);
					
					//RefreshToken 유효성 검사후 access token 재발급, 유효시간은 발급시점부터 새로 갱신
					if(refreshToken != "" && authService.ValidateJwtRefreshToken(refreshToken)) {
						
						tokenDto = authService.regenerateAccessTokenByRefreshToken(refreshToken);
						
						log.info("Access Token 재발급 >>>> New AccessToken: {}", tokenDto.getAccessToken());
						
					} else {
						//Refresh Token Cookie 없음 
						log.info("Refresh Token Cookie 없음");
						return ApiResponse.fail(new CustomException(ErrorCode.REFRESH_TOKEN_INVALID));
					}
				} else {
					//유효한 accessToken 이면 재발급하지 않음.
					tokenDto = null;
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
		newUser.setCre_id("SA");
		newUser.setUpd_id("SA");
		
		
		try {
			authService.JoinUser(newUser);
			result = "User Join Success";
		} catch(Exception e) {
			result = String.format("User Join Failed::%s", e.getMessage());
		}
		
		return result;
	}
	

	
	/*
	 * 사용자 Logout 처리
	 * 로그아웃시간 업데이트 
	 * */
	@PostMapping("/LogoutUser")
	public boolean logoutUser(String email) {
		try {
			return authService.logoutUser(email);
		} catch(Exception e) {
			return false;
		}
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
