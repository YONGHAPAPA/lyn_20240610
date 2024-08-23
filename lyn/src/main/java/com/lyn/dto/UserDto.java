package com.lyn.dto;

import lombok.Data;

@Data
public class UserDto {
	
	/*
	 * mybatis 의 쿼리 결과셋에 담을려면 속성명이 테이블컬럼명과 동일해야 처리됨.
	 * */
	private Integer user_seq;
	private String user_email;
	private String user_pwd;
	private String user_role;
	private String cre_id;
	private String upd_id;
}
