package com.lyn.controller.member;

import java.util.Collection;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/member")
public class MemberController {

	
	
	@PostMapping("/myInfo")
	public String myInfo() {
		log.info("MemberController >>>>> start ");
		
		Collection<SimpleGrantedAuthority> auth_role_info = (Collection<SimpleGrantedAuthority>)SecurityContextHolder.getContext().getAuthentication().getAuthorities();
		log.info("MemeberController::auth_role_info: {}", auth_role_info);
		
		return "this is my info page";
	}
}
