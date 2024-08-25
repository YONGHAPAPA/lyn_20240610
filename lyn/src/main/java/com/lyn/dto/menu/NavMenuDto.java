package com.lyn.dto.menu;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NavMenuDto {
	private String domainCd;
	private String title;
	private int orderSeq;
	private int parentSeq;
	private String icon; 
	private String rmk;
	private String isUse;
	private String deltFlg;
	private NavMenuDto[] subMenu;	
}
