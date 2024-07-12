package com.lyn.controller.member;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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
		return "this is my info page";
	}
}
