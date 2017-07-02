package com.yaoyao.util;

public class Config {
	
	private Config(){
		
	}
	
	private static Config config = null;
	
	public Config getInstance(){
		if(Config.config == null){
			Config.config = new Config();
		}
		
		return Config.config;
	}
}
