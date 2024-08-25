package com.lyn.controller.menu;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lyn.dto.menu.NavMenuDto;
import com.lyn.model.common.ApiResponse;

import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/menu")
public class MenuController {

	
	//public ApiResponse<?> LoginUser(HttpServletResponse response, @RequestParam(required=true, value="userEmail") String userEmail, @RequestParam(required=true, value="userPassword") String userPassword){
	@PostMapping("/getNavMenuByDomain")
	public ApiResponse<?> getNavMenuByDomain(HttpServletResponse response, @RequestParam(required=true, value="domainCd") String domainCd) {
		
		log.info("domainCd:{}", domainCd);
		return ApiResponse.ok(null);
	}
}
