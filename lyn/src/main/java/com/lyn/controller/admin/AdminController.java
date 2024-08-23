package com.lyn.controller.admin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/admin")
public class AdminController {
	
	
	@PostMapping("/dashBoard")
	public String dashBoard(HttpServletResponse response, @RequestParam(required=true, value="domainCd") String domainCd) {
		
		log.info("domainCd : {}", domainCd);
		
		return "this is admin dash board.";
	}

}
