package com.lyn.service.authentication;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.ibatis.session.SqlSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lyn.component.jwt.JwtUtil;
import com.lyn.dto.UserDto;
import com.lyn.dto.jwt.JwtTokenDto;
import com.lyn.mapper.user.UserMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {

	private final SqlSession sqlSession;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManagerBuilder authManagerBuilder;
	private final JwtUtil jwtUtil;
	
	//private final JOIN_USER_DEFAULT_ROLE = @Value
	
	@Transactional
	@Override
	public UserDto JoinUser(UserDto user) throws Exception {
		
		//JwtTokenDto token = null;
		
		try {
			
			UserMapper mapper = sqlSession.getMapper(UserMapper.class);
			user.setUser_pwd(passwordEncoder.encode(user.getUser_pwd()));
			//user.setUser_seq(0);
			Integer result = mapper.CreateUser(user);

			log.info(String.format("user::: %s", user.toString()));
			
		} catch(Exception e) {
			log.error(String.format("JoinUser:: %s", e.getStackTrace() + "\r\n" + e.getMessage()));
			throw e;
		}
		
		return user;
	}
	
	
	@Transactional
	@Override
	public JwtTokenDto SignInUser(UserDto user) throws UsernameNotFoundException {
		
		JwtTokenDto jwtToken = null;
		
		try {

			/*
			 * user_email 과 user_pwd 로 생성한 인증용 token으로 authManagerBuilder.getObject().authenticate(userToken)을 실행시키면 
			 * UserDetailsService 를 상속한 AuthenticationUserDetailService 의 loadUserByUsername 에서 조회된 UserDetails 객체의 암호와 인증처리를 하게 된다.
			 * 
			 * (check!!)근데 pwd가 암호와 되어 있는데.. UsernamePasswordAuthenticationToken을 생성시킬때는 plain text로 넘겨주는데 어떻게 비교를 하는지 궁금하네
			 * 
			 * */
			UsernamePasswordAuthenticationToken userToken = new UsernamePasswordAuthenticationToken(user.getUser_email(), user.getUser_pwd());
			Authentication auth = authManagerBuilder.getObject().authenticate(userToken);
			

			/*
			 * 인증처리후(AuthenticationManagaerBuilder.authenticate 로 인증처리후 loadUserByUsername 로 전달받은 UserDetails로 Authentication 객체(auth)로 token을 생성해준다. 
			 * */
			
//			Login시 생성된 Authentication 객체의 Role 확인
//			List<String> authList = auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
//			log.info("AuthenticationServiceImpl:SignInUser::authList: {}", authList);
			jwtToken = jwtUtil.generateToken(auth);
			

			log.info(String.format("token: %s", jwtToken));
		} catch(UsernameNotFoundException e) {
			log.error(String.format("SignInUser UsernameNotFoundException :: %s", e.getClass().toString()));
			throw new UsernameNotFoundException(e.getMessage());
		} 
		catch(Exception e) {
			log.error(String.format("SignInUser Exception :: %s", e.getClass().toString()));
			throw new BadCredentialsException(e.getMessage());
		}
		
		return jwtToken;
	}
	
	
	
	
//	@Override
//	public String EncodePassword(String password) throws Exception {
//		return passwordEncoder.encode(password);
//	}
	
	
	
}
