package com.lyn.service.authentication;

import java.util.Optional;

import org.apache.ibatis.session.SqlSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lyn.component.jwt.JwtUtil;
import com.lyn.dto.UserDto;
import com.lyn.dto.jwt.JwtTokenDto;
import com.lyn.mapper.user.UserMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements IAuthenticationService {

	private final SqlSession sqlSession;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManagerBuilder authManagerBuilder;
	private final JwtUtil jwtUtil;
	
	//private final JOIN_USER_DEFAULT_ROLE = @Value
	
	private final Logger logger = LogManager.getLogger(AuthenticationServiceImpl.class);

	@Transactional
	@Override
	public UserDto JoinUser(UserDto user) throws Exception {
		
		//JwtTokenDto token = null;
		
		try {
			
			UserMapper mapper = sqlSession.getMapper(UserMapper.class);
			user.setUser_pwd(passwordEncoder.encode(user.getUser_pwd()));
			//user.setUser_seq(0);
			Integer result = mapper.CreateUser(user);

			logger.info(String.format("user::: %s", user.toString()));
			
		} catch(Exception e) {
			logger.error(String.format("JoinUser:: %s", e.getStackTrace() + "\r\n" + e.getMessage()));
			throw e;
		}
		
		return user;
	}
	
	
	@Transactional
	@Override
	public JwtTokenDto SignInUser(UserDto user) throws Exception {
		
		JwtTokenDto jwtToken = null;
		
		try {

			/*
			 * user_email 과 user_pwd 로 생성한 인증용 token으로 authManagerBuilder.getObject().authenticate(userToken)을 실행시키면 
			 * UserDetailsService 를 상속한 AuthenticationUserDetailService 의 loadUserByUsername 에서 조회된 UserDetails 객체의 암호와 인증처리를 하게 된다.
			 * */
			UsernamePasswordAuthenticationToken userToken = new UsernamePasswordAuthenticationToken(user.getUser_email(), user.getUser_pwd());
			Authentication auth = authManagerBuilder.getObject().authenticate(userToken);
			
			/*
			 * 인증처리후 jwt token을 생성해준다. 
			 * */
			jwtToken = jwtUtil.generateToken(auth);
			
			//log.info(String.format("auth: %s", auth.toString()));
			logger.info(String.format("token: %s", jwtToken));
			
		} catch(Exception e) {
			logger.error(String.format("SignInUser::: %s", e.getMessage()));
		}
		
		return jwtToken;
	}
	
	
	
	
//	@Override
//	public String EncodePassword(String password) throws Exception {
//		return passwordEncoder.encode(password);
//	}
	
	
	
}
