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

	@Override
	public void JoinUser(UserDto user) throws Exception {
		UserMapper mapper = sqlSession.getMapper(UserMapper.class);
		mapper.CreateUser(user);
	}
	
//	@Override
//	public String EncodePassword(String password) throws Exception {
//		return passwordEncoder.encode(password);
//	}
	
	
	
}
