package com.lyn.service.menu;

import java.util.List;

import com.lyn.dto.menu.NavMenuDto;

public interface NavMenuService {

	public List<NavMenuDto> GetNavMenuByDomain(String domainCd);
}
