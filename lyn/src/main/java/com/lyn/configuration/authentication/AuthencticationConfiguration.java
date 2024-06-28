package com.lyn.configuration.authentication;


import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration
public class AuthencticationConfiguration {
	
	
	//private static final String[] IGNOR_AUTH_API_LIST = {"/ignore_test"};
	private static final String[] AUTH_WHITE_LIST = {"/index", "/test/**"};

//	@Bean
//	PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
	
	

	/*
	 * 보안처리 예외 API 항목
	 */
//	@Bean 
//	public WebSecurityCustomizer webSecurityCustomizer() {
//		return webSecurity -> {
//			webSecurity.ignoring()
//			.requestMatchers(IGNOR_AUTH_API_LIST);
//		};
//	}
	
	
	
	/*
	 * API 접근 보안 필터 설정 
	 * org.springframework.boot:spring-boot-starter-security 참조후 
	 * 최소 SecurityFilterChain 필터메서드는 등록필요
	 * 등록하지 않으면 일단 Security 모듈에 의해서 기본적으로 /Login 으로 redirect 처리하는 것으로 보임
	 * 
	 * 아래 Bean 을 최소 비어 있는 내용으로 등록하면 일단 /Login 으로 redirect 처리는 하지 않음. 
	 * 
	 * */
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		/* Form 인증용 설정 (s) */
		/*
		http
			.csrf((csrfConfig) -> csrfConfig.disable())
			.headers((headerConfig) -> headerConfig.disable())
			.authorizeHttpRequests((authorizeRequests) -> authorizeRequests
					//.requestMatchers("/", "/index", "/login", "/register", "/mybatis/insert", "/api/test").permitAll()
					.requestMatchers("/", "/**").permitAll()
					.requestMatchers("/admin").hasRole(Role.ADMIN.name())
					.requestMatchers("/edit").hasRole(Role.USER.name())
					.anyRequest().authenticated())
			.exceptionHandling((exceptionConfig) -> exceptionConfig.authenticationEntryPoint(unauthorizedEntryPoint).accessDeniedHandler(accessDeniedHandler))
			.formLogin((formLogin)->{
				formLogin
				.loginPage("/login")
				.usernameParameter("user_id")
				.passwordParameter("user_pwd")
				.loginProcessingUrl("/login-proc")
				.defaultSuccessUrl("/myTask", true);
			})
			.logout((logoutConfig) -> logoutConfig.logoutSuccessUrl("/"))
			.userDetailsService(myUserDetailService);
		
		
		return http.build();
		*/
		/* Form 인증용 설정 (e) */
		
		
	 
		/*
		* JWT 인증방식 필터 설정 (s)
		*/
		http
		.csrf(csrf->csrf.disable())
		.cors(Customizer.withDefaults()) //CorsConfigurationSource 로 등록한 bean 적용
		.sessionManagement(sessionManagement->sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))	//세션사용안함
		.formLogin(form->form.disable())	//Form Login 비활성화
		.httpBasic(AbstractHttpConfigurer::disable)	//BasicHttp 비활성화
		.authorizeHttpRequests(authorizeRequests->authorizeRequests.requestMatchers(AUTH_WHITE_LIST).permitAll().anyRequest().authenticated());
		
		
		/*
		* JWT 인증방식 필터 설정 (e)
		*/
		
		
		return http.build();
		
	}
	
	
	
	/*
	 * FrontEnd 측에서 Proxy(Package.json내의 Proxy처리) 모듈을 사용할경우 별도의 CORS 옵션처리를 할필요가 없음
	 * FrontEnd 에서 Proxy 처리할 경우 브라우저 디버깅(네트워크탭, XHR)시 요청헤더/응답헤더의 Orgin/ 
	 * */
	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilterRegistrationBean() {
		System.out.println("CorsFilter 3 >>>>>> start");
		
		CorsConfiguration config = new CorsConfiguration();
		
		config.setAllowCredentials(true);
		config.addAllowedOrigin("http://localhost:3000");
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");
		config.setMaxAge(600L);
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		
		FilterRegistrationBean<CorsFilter> filterBean = new FilterRegistrationBean<>(new CorsFilter(source));
		filterBean.setOrder(0);
		
		return filterBean;
	}
	
	
	
}
