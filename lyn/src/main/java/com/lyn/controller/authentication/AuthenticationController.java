package com.lyn.controller.authentication;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lyn.dto.UserDto;
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
	
	
	
	@PostMapping("/JoinUser")
	public String JoinUser(@RequestParam(required=false, value="userEmail") String userEmail, @RequestParam(required=false, value="userPassword") String userPassword) {
		
		String result = "";
		
//		UserMapper mapper = sqlSession.getMapper(UserMapper.class);
//		List<String> roles = mapper.GetUserRoles("aaa");
//		
//		System.out.println(roles);
		
		UserDto newUser = new UserDto();
		newUser.setUserEmail(userEmail);
		newUser.setUserPassword(userPassword);
		newUser.setCreateUserId("KMS");
		
		
		System.out.println(String.format("userEmail : %s", newUser.getUserEmail()));
		System.out.println(String.format("userPassword : %s", newUser.getUserPassword()));
		
		try {
			authService.JoinUser(newUser);
			result = "User Join Success";
		} catch(Exception e) {
			result = "User Join Failed";
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
