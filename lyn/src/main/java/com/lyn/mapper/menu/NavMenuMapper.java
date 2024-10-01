package com.lyn.mapper.menu;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.lyn.dto.menu.NavMenuDto;

@Mapper
public interface NavMenuMapper {

	public List<NavMenuDto> GetNavMenuByDomain(String domainCd);
	
	public int UpdateNavMenu(NavMenuDto dto);
}
