package com.lyn.controller.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lyn.model.common.ApiResponse;
import com.lyn.model.common.CustomException;
import com.lyn.model.common.ErrorCode;
import com.lyn.service.authentication.AuthenticationService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class CommonController {

//	@Autowired
//	AuthenticationService authService;
	
	@GetMapping("/index")
	public String index() {
		return "index page 3";
	}
	
	@GetMapping("/responseEntity")
	public ResponseEntity<String> responseEntity(){
		return ResponseEntity.ok("ok~");
	}
	
	
	@GetMapping("/succ1")
	public ApiResponse<?> success1(){
		return ApiResponse.ok("ok~");
	}
	
	@GetMapping("/succ2")
	public ApiResponse<?> success2(){
		return ApiResponse.ok(null);
	}
	
	@GetMapping("/succ3")
	public ApiResponse<?> success3(){
		return ApiResponse.created("created");
	}
	
	@GetMapping("/except1")
	public ApiResponse<?> custExcept(){
		
		log.info("custExcept >> ");
		
		throw new CustomException(ErrorCode.BAD_REQUEST);
	}
	
	@GetMapping("/except2")
	public ApiResponse<?> runTimeExcept(){
		throw new RuntimeException();
	}
	
	
	
}

