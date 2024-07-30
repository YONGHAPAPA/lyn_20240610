package com.lyn.controller.common;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import com.lyn.model.common.ApiResponse;
import com.lyn.model.exception.ApiResponse;
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
		
		try {
			
			
			log.info("this is index page");
		
//			String[] arr = new String[] {"a", "b", "c", "d"};
//			
//			Stream<String> stream = Arrays.stream(arr);
//			log.info("stram:toString > {}", stream.toString());
//			log.info("stram:toList > {}", stream.toList());
//			
//			
//			Stream<String> streamOfArrayPart = Arrays.stream(arr, 1, 4);
//			log.info("streamOfArrayPart > {}", streamOfArrayPart.toString());
//			log.info("streamOfArrayPart.toList > {}", streamOfArrayPart.toList());
//			
//			Stream<String> generatedStream = Stream.generate(()->"test").limit(5);
//			log.info("generatedStream > {}", generatedStream.toList());
//			
//
//			IntStream intStream = IntStream.range(0, 150).parallel();
//			log.info("intStream > {}", intStream.toArray());
//			
//			Stream<Integer> iterate = Stream.iterate(1, i->i+1).limit(10);
//			log.info("iterate > {}", iterate.toList());
//			Integer sum = Stream.iterate(1, i->i+1).limit(10).reduce(0, Integer::sum);
//			log.info("sum > {}", sum);
//			
//			String auth = "USER,ADMIN,SUPER,SYSTEM";
//			
//			Stream<String> authStream1 = Arrays.stream(auth.split(",")).map(String::toLowerCase);
//			log.info("authStream > {}", authStream1.toList());
//			
//			Stream<SimpleGrantedAuthority> authStream2 = Arrays.stream(auth.split(",")).map(SimpleGrantedAuthority::new);
//			log.info("authStream2 > {}", authStream2.toList());
//			
//			
//			Collection<? extends GrantedAuthority> authCollection = Arrays.stream(auth.split(",")).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
//			log.info("authCollection > {}", authCollection.toString());
//			
//			List<List<String>> list = Arrays.asList(Arrays.asList("a", "b"), Arrays.asList("c", "d"));
//			log.info("list > {}", list.size());
//			log.info("list.flatMap > {}", list.stream().flatMap(Collection::stream));
//			log.info("list 0 > {}", list.get(0));
//			log.info("list 1 > {}", list.get(1));
			
			
			
			
		} catch(Exception e) {
			log.error("CommonController::Exception Error::index > {}", e.getMessage());
		}
		
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

