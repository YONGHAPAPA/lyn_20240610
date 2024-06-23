package com.lyn.configuration.mybatis;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@MapperScan(basePackages="com.lyn.mapper")
@EnableTransactionManagement
public class mybatisConfiguration {

	@Value("${mybatis.mapper-locations}")
	private String MAPPER_LOCATIONS;
	
	
	@Bean
	public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
		final SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
		bean.setDataSource(dataSource);
		
		/*
		 * application.properties 에 mybatis.mapper-locations 로 추가해주고 아래 코드는 주석처리했는데 mapper interface 를 찾지못하네 
		 * 아래 bean 주입할때 mapperLocation 설정해주어야
		 * */
		PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
		bean.setMapperLocations(resolver.getResources(MAPPER_LOCATIONS));
		return bean.getObject();
	}
	
	@Bean
	public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) throws Exception {
		final SqlSessionTemplate sqlSessionTemplate = new SqlSessionTemplate(sqlSessionFactory);
		return sqlSessionTemplate;
	}
}
