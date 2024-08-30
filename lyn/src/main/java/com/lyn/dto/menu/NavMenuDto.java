package com.lyn.dto.menu;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class NavMenuDto {
	
	/*
	 * mybatis 의 쿼리 결과셋에 담을려면 속성명이 테이블컬럼명과 동일해야 처리됨. 
	 * Mapper ResultMap에 column 명과 property 지정하면 컬럼명과 동일할 필요는 없음
	 * */
	private long seq;
	private String domainCd;
	private String title;
	private int orderSeq;
	private long parentSeq;
	private String url;
	private String icon; 
	private String rmk;
	private String isUse;
	private String deltFlg;
	private String creId;
	private Date creDt;
	private String updId;
	private Date upd_dt;
}
