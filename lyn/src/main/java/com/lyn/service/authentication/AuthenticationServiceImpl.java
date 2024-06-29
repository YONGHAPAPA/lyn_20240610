package com.lyn.service.authentication;

import org.apache.ibatis.session.SqlSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lyn.dto.UserDto;
import com.lyn.mapper.user.UserMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements IAuthenticationService {
	
	@Autowired
	private SqlSession sqlSession;
	
	//final private PasswordEncoder passwordEncoder;
	
	//private final Logger logger = LogManager.getLogger(AuthenticationServiceImpl.class);

	@Override
	public void JoinUser(UserDto user) throws Exception {
		
		try {
			UserMapper mapper = sqlSession.getMapper(UserMapper.class);

			
			//System.out.println("user.getUserEmail: " + user.getUserEmail());
			//logger.info("getUserRoleGroup >> " + user.getUserRoleGroup());
			
			
			mapper.CreateUser(user);
		} catch(Exception e) {
			System.out.println(String.format("[Error]JoinUser::%s", e.getMessage()));
			throw e;
		}
	}
	
//	@Override
//	public String EncodePassword(String password) throws Exception {
//		return passwordEncoder.encode(password);
//	}
	
	
	
}
