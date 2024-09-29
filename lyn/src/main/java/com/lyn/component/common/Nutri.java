package com.lyn.component.common;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Nutri {
	private int size;
	private int servings;
	private int fat;
	
	public static class Builder {
		private int size;
		private int servings;
		private int fat;
		
		public Builder(int size, int servings) {
			this.size = size;
			this.servings = servings;
			this.fat = 0;
		}
		
		public Builder setFat(int val) {
			this.fat = val;
			return this;
		}
		
		public Nutri build() {
			return new Nutri(this);
		}
	}
	
	public Nutri(Builder builder) {
		this.size = builder.size;
		this.servings = builder.servings;
		this.fat = builder.fat;
	}
	
	
	public void print() {
		log.info("size:{}, servings:{}, fat:{}", this.size, this.servings, this.fat);
	}
	
	
	public static void main(String[] args) {
		
		log.info("this is Nutri class");
		Nutri nu = new Nutri.Builder(1, 10).setFat(85).build();
		
		nu.print();
		
	}
}
