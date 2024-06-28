package com.lyn.controller.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lyn.service.authentication.IAuthenticationService;

@RestController
public class CommonController {

//	@Autowired
//	IAuthenticationService authService;
	
	@GetMapping("/index")
	public String index() {
	
		String encodedStr = "";
		
		System.out.println("index > start");
		
				
//		try {
//			
//			System.out.println("index > start");
//			encodedStr = authService.EncodePassword("test");
//		} catch (Exception e) {
//			
//		}
//
//		return String.format("encoded str: %s", encodedStr);
		
		return "index page 3";
	}
}

