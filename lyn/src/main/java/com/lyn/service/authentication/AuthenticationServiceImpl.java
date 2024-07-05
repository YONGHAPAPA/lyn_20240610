package com.lyn.service.authentication;

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
	
	//private final JOIN_USER_DEFAULT_ROLE = @Value
	
	private final Logger log = LogManager.getLogger(AuthenticationServiceImpl.class);

	@Transactional
	@Override
	public UserDto JoinUser(UserDto user) throws Exception {
		
		//JwtTokenDto token = null;
		
		try {
			
			UserMapper mapper = sqlSession.getMapper(UserMapper.class);
			user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
			Integer result = mapper.CreateUser(user);

//			log.info(String.format("user::: %s", user.toString()));
//			UserDto joinUser = mapper.GetUserByUserName(user.getUserEmail());
//			log.info(String.format("joinUser.getUserEmail():: %s", joinUser.getUserEmail()));
			
			
//			JwtTokenDto signedToken = SignInUser(user);
//			//spring의 userid, password로 만드는 token으로 실제로 인증처리 된 상태의 token은 아님
//			UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user.getUserEmail(), user.getUserPassword());
//			
//			
//			log.info(String.format("authToken.isAuthenticated(): %b", authToken.isAuthenticated()));	//현재는 false
//			
//			
//			//위에서 만든 authToken의 인증처리, authenticate 함수 실행시 loadUserByUsername 이 처리됨
//			Authentication auth = authManagerBuilder.getObject().authenticate(authToken);
//			
//			log.info(String.format("auth.isAuthenticated: %b", auth.isAuthenticated()));
			
		} catch(Exception e) {
			log.error(String.format("JoinUser:: %s", e.getStackTrace() + "\r\n" + e.getMessage()));
			throw e;
		}
		
		return user;
	}
	
	
	
	public JwtTokenDto SignInUser(UserDto user) throws Exception {
		
		JwtTokenDto token = null;
		
		try {
			
			UsernamePasswordAuthenticationToken userToken = new UsernamePasswordAuthenticationToken(user.getUserEmail(), user.getUserPassword());
			Authentication auth = authManagerBuilder.getObject().authenticate(userToken);
			
			
		} catch(Exception e) {
			log.error(String.format("SignInUser::: %s", e.getMessage()));
		}
		
		return token;
	}
	
	
	
	
//	@Override
//	public String EncodePassword(String password) throws Exception {
//		return passwordEncoder.encode(password);
//	}
	
	
	
}
