package com.lyn.controller.authentication;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lyn.dto.UserDto;
import com.lyn.dto.jwt.JwtTokenDto;
import com.lyn.mapper.user.UserMapper;
import com.lyn.service.authentication.IAuthenticationService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

//	@Autowired
//	DataSource dataSource;
	
//	@Autowired
//	SqlSession sqlSession;
	
	@Autowired
	IAuthenticationService authService;
	
	Logger logger = LogManager.getLogger(AuthenticationController.class);
	
	
	@PostMapping("/AuthTest")
	public ResponseEntity<String> AuthTest(@RequestParam(required=true, value="key") String key, @RequestParam(required=true, value="key") String value){
	
		
		return ResponseEntity.ok("AuthTest OK~~~~");
	}
	

	@PostMapping("/LoginUser")
	public ResponseEntity<JwtTokenDto> LoginUser(@RequestParam(required=true, value="userEmail") String userEmail, @RequestParam(required=true, value="userPassword") String userPassword){
		
		JwtTokenDto tokenDto = null;
		//logger.info(String.format("/LoginUser : %s : %s", userEmail, userPassword));
		
		UserDto loginUser = new UserDto();
		loginUser.setUser_email(userEmail);
		loginUser.setUser_pwd(userPassword);
		
		try {
			tokenDto = authService.SignInUser(loginUser);
		} catch (Exception e) {
			logger.error(e.getStackTrace() + e.getMessage());
		}
		
		return ResponseEntity.ok(tokenDto);
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
