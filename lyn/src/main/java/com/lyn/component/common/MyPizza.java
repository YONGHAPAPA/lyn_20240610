package com.lyn.component.common;

import java.util.Iterator;
import java.util.Set;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class MyPizza extends Pizza {
	
	/* version 1 */
	/* 
	Set<Pizza.Topping> toppings;
	int size;
	
	static class Builder extends Pizza.Builder {

		@Override
		Pizza build() {
			return new MyPizza(this);
		}
	}
	
	public MyPizza(Builder build) {
		super(build);
		this.toppings = build.toppings;
		this.size = build.size;
		// TODO Auto-generated constructor stub
	}
	
	
	public void print() {
		
		String strToppings = "";
		Iterator it = this.toppings.iterator();
		while(it.hasNext()) {
			strToppings += "," + it.next().toString();
		}
		
		log.info("MyPizza >> toppings:{}, size:{}", strToppings, this.size);
	}
	*/
	
	/* version 2 */
	int thick;
	static class Builder extends Pizza.Builder<Builder> {

		int thick;
		
		public Builder(int thick) {
			this.thick = thick;
		}
		
		@Override
		MyPizza build() {
			return new MyPizza(this);
		}

		@Override
		protected Builder self() {
			return this;
		}
	}
	
	MyPizza(Builder builder) {
		super(builder);
		this.thick = builder.thick;
	}
	
	public void print() {
		String strToppings = "";
		Iterator it = this.toppings.iterator();
		while(it.hasNext()) {
			strToppings += "," + it.next().toString();
		}
		
		log.info("Ver2. MyPizza >> toppings:{}, size:{}, thick:{}", strToppings, this.size, this.thick);
	}
	

}
