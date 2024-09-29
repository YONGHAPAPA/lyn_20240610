package com.lyn.component.common;

import com.lyn.component.common.Pizza.Topping;

import lombok.extern.slf4j.Slf4j;


@Slf4j
class Rectangle {

	int width;
	int height;
	int size;
	String border;
	
	static class Builder {
		int width;
		int height;
		int size =0;
		String border = "";
		
		public Builder(int width, int height) {
			this.width = width;
			this.height = height;
		}
		
		
		public Builder size(int val) {
			this.size = val;
			return this;
		}
		
		public Builder border(String val) {
			this.border = val;
			return this;
		}
		
		public Rectangle build() {
			return new Rectangle(this);
		}
		
	}
	
	Rectangle(Builder builder){
		this.width = builder.width;
		this.height = builder.height;
		this.size = builder.size;
		this.border = builder.border;
	}
	
	
	public void print() {
		log.info("Rectangle => width:{}, height:{}, size:{}, border:{}", this.width, this.height, this.size, this.border);
	}
}





@Slf4j
public class ApiTest {

	public static void main(String[] args) {
//		Rectangle rec = new Rectangle.Builder(10, 20).size(56).border("까끌까").build();
//		rec.print();
		
		//MyPizza my = (MyPizza)new MyPizza.Builder().size(20).addTopping(Topping.HAM).addTopping(Topping.TOMATO).build();
		//my.print();
		
		
		//Ver2
		MyPizza my = new MyPizza.Builder(20).addTopping(Topping.HAM).addTopping(Topping.ONION).size(33).build();
		my.print();
		
	}
	
	
}
