package com.lyn.service.menu;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lyn.dto.menu.NavMenuDto;
import com.lyn.mapper.menu.NavMenuMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RequiredArgsConstructor
@Service
public class NavMenuServiceImpl implements NavMenuService{
	
	private final SqlSession sqlSession;

	@Transactional
	@Override
	public List<NavMenuDto> GetNavMenuByDomain(String domainCd){
		
		NavMenuMapper mapper = sqlSession.getMapper(NavMenuMapper.class);
		List<NavMenuDto> navMenus = null;
		
		try {

			navMenus = mapper.GetNavMenuByDomain(domainCd);
//			navMenus.forEach(menu -> log.debug(menu.getSeq() + "> " + menu.getTitle()));
//			for(NavMenuDto menu : navMenus) {
//				log.info("GetNavMenuByDomain >>> " + menu.getSeq() + " :: " + menu.getTitle() + " :: ");
//			}
		}catch(Exception e) {
			log.error("[Error:: GetNavMenuByDomain] {}", e.getMessage());
		}
		
		return navMenus;
	}
}
