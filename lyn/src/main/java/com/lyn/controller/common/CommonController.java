package com.lyn.controller.common;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommonController {

	@GetMapping("common")
	public String index() {
		
		return "return common";
	}
	
	
	
}

