package com.lyn.controller.admin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	
	@PostMapping("/dashBoard")
	public String dashBoard() {
		
		
		return "this is admin dash board.";
	}

}
