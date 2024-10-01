package com.lyn.component.common;

import java.util.EnumSet;
import java.util.Iterator;
import java.util.Set;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class MyPizza extends Pizza {
	
	enum Border {BLACK, YELLOW, RED, WHITE};
	
	int size;
	Set<Border> border;
	
	static class Builder extends Pizza.Builder<Builder> {
		
		int size;
		EnumSet<Border> border = EnumSet.noneOf(Border.class);
		
		public Builder(int size) {
			this.size = size;
		}
		
		Builder addBorder(Border border) {
			this.border.add(border);
			return this;
		}
		
		@Override
		Builder self() {
			return this;
		}
		
		@Override
		MyPizza build() {
			return new MyPizza(this);
		}
	}
	
	private MyPizza(Builder builder) {
		super(builder);
		this.size = builder.size;
		this.border = builder.border;
	}
	
	
	public void print() {
		String toppings = "";
		String borders = "";
		Iterator it = this.toppings.iterator();
		while(it.hasNext()) {
			toppings += it.next() + ",";
		}
		
		Iterator it2 = this.border.iterator();
		while(it2.hasNext()) {
			borders += it2.next() + ",";
		}
		
		
		
		log.info("MY Pizza >> toppings:{}, size:{}, border:{}", toppings, this.size, borders);
	}
}


