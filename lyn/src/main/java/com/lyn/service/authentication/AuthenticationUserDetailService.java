package com.lyn.service.authentication;

import org.apache.ibatis.session.SqlSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.lyn.dto.UserDto;
import com.lyn.mapper.user.UserMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AuthenticationUserDetailService implements UserDetailsService {

	private final SqlSession sqlSession;
	
	Logger logger = LogManager.getLogger(AuthenticationUserDetailService.class);
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		try {
			
			UserMapper mapper = sqlSession.getMapper(UserMapper.class);
			return convertUserToUserDetail(mapper.GetUserByUserName(username));
			
		} catch(Exception e) {
			throw new UsernameNotFoundException("There is no user");
		}
	}
	
	
	private UserDetails convertUserToUserDetail(UserDto user) {
		
		logger.info(String.format("convertUserToUserDetail:: %s", user.getUserEmail()));
		
		return User.builder()
				.username(user.getUserEmail())
				.password(user.getUserPassword())
				.roles(user.getUserRoleGroup())
				.build();
	}
}
