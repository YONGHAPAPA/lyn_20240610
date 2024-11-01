package com.lyn.service.authentication;

import org.apache.ibatis.session.SqlSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.lyn.dto.user.UserDto;
import com.lyn.mapper.user.UserMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthenticationUserDetailService implements UserDetailsService {

	private final SqlSession sqlSession;
	
	@Override
	public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
		try {
			
			
			//log.info("loadUserByUsername::userEmail: {}", userEmail);
			
			/*
			 * 인증시 loadUserByUsername 에서 처리된 UserDetails 객체에서 패스워드 인증 처리 및 권한처리가 됨
			 * */

			//logger.info(String.format("loadUserByUsername:: userEmail:: %s", userEmail));
			UserMapper mapper = sqlSession.getMapper(UserMapper.class);
			
			UserDto user = new UserDto();
			user.setUser_email(userEmail);
			
			return buildUserDetails(mapper.GetUserByUserEmail(user.getUser_email()));
			
		} catch(Exception e) {
			//log.error("loadUserByUsername:: {}", "user is not exist");
			throw new UsernameNotFoundException("There is no user");
		}
	}
	
	
	/*
	 * 로긴시 사용자 정보(Role 정보포함해서 Token 만들기위한 UerDetails 객체반환)
	 * */
	private UserDetails buildUserDetails(UserDto user) {
		
		//log.info(String.format("convertUserToUserDetail:: %s", user.getUser_email()));
		//log.info("AuthenticationUserDetailService::buildUserDetails: {}", user.getUser_role_group());
		
		return User.builder()
				.username(user.getUser_email())
				.password(user.getUser_pwd())
				.roles(user.getUser_role().split(","))			//Authority 와 Role 구분해서 지정하도록 GrantedAuthority.getAuthority 에서 반환
				//.authorities(user.getUser_role_group().split(","))    //Role 로 지정시 getAutority 에서 반환시 접두어 'Role_' 을 붙여 반환
				.build();
	}
}
