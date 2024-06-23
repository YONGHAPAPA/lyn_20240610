package com.lyn.configuration.jndi;

import javax.naming.NamingException;
import javax.sql.DataSource;

import org.apache.catalina.Context;
import org.apache.catalina.startup.Tomcat;
import org.apache.tomcat.util.descriptor.web.ContextResource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.embedded.tomcat.TomcatWebServer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jndi.JndiObjectFactoryBean;

@Configuration
public class jndiConfiguration {

	/* 
	 * 내장톰캣 JNDI를 사용할경우 등록할 Bean (외장톰캣경우 필요없음)
	 * 톰캣외부서버 사용시 ContextResource 정보는 server.xml, context.xml 에 설정
	 * ContextResource.factory는 외장 JNDI Resource 정보에는 없
	 *  
	 * */
	
	@Value("${contextResource.name}")
	private String CXT_RES_NAME;
	@Value("${contextResource.auth}")
	private String CXT_RES_AUTH;
	@Value("${contextResource.type}")
	private String CXT_RES_TYPE;
	@Value("${contextResource.driverClassName}")
	private String CXT_RES_DRV_CLS_NM;
	@Value("${contextResource.factory}")
	private String CXT_RES_FTRY;
	@Value("${contextResource.maxTotal}")
	private String CXT_RES_MAX_TTL;
	@Value("${contextResource.maxIdle}")
	private String CXT_RES_MAX_IDLE;
	@Value("${contextResource.maxWaitMillis}")
	private String CXT_RES_MAX_WAIT;
	@Value("${contextResource.url}")
	private String CXT_RES_URL;
	@Value("${contextResource.username}")
	private String CXT_RES_USER_NM;
	@Value("${contextResource.password}")
	private String CXT_RES_USER_PWD;	
	
	
	@Bean
	TomcatServletWebServerFactory tomcatFactory() {
		
		//구조가 이해가 잘안됨...심화체크 
		return new TomcatServletWebServerFactory() {
			
			@Override
			protected TomcatWebServer getTomcatWebServer(Tomcat tomcat) {
				tomcat.enableNaming();
				return super.getTomcatWebServer(tomcat);
			}
			
			@Override
			protected void postProcessContext(Context context) {
				ContextResource res = new ContextResource();
				res.setName(CXT_RES_NAME);
				res.setAuth(CXT_RES_AUTH);
				res.setType(CXT_RES_TYPE);
				
				//Query Log에 파라메터 포함하기 위해서 URL 을 변
				//res.setProperty("driverClassName", "org.postgresql.Driver");
				res.setProperty("driverClassName",CXT_RES_DRV_CLS_NM) ;
				res.setProperty("factory",CXT_RES_FTRY) ;
				res.setProperty("maxTotal",CXT_RES_MAX_TTL) ;
				res.setProperty("maxIdle", CXT_RES_MAX_IDLE);
				
				/* contextResource.maxWaitMillis: The maximum number of milliseconds that the pool will wait (when there are no available connections) for a connection to be returned before throwing an exception.
				 * Default: -1 (infinite)
				 * */
				res.setProperty("maxWaitMillis", CXT_RES_MAX_WAIT);
				res.setProperty("url", CXT_RES_URL);
				res.setProperty("username", CXT_RES_USER_NM);
				res.setProperty("password", CXT_RES_USER_PWD);
				
				context.getNamingResources().addResource(res);
			}
		};
	}
	
	@Bean
	public DataSource getDataSourceFromJNDI() throws IllegalArgumentException, NamingException {
		JndiObjectFactoryBean bean = new JndiObjectFactoryBean();
		
		try {
			bean.setJndiName(CXT_RES_NAME);
			bean.setResourceRef(true);
			bean.setProxyInterface(DataSource.class);
			bean.setLookupOnStartup(false);
			bean.afterPropertiesSet();
		} catch (NamingException e) {
			e.printStackTrace();
		}
		
		return (DataSource)bean.getObject();
	}
	
}
