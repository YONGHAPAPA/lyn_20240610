package com.lyn.component.common;

import com.lyn.component.common.MyPizza.Border;
import com.lyn.component.common.Pizza.Topping;

public class ApiTest {

	public static void main(String[] args) {
		
		MyPizza my = new MyPizza.Builder(20).addTopping(Topping.HAM).addTopping(Topping.ONION).addTopping(Topping.TOMATO).addBorder(Border.BLACK).addBorder(Border.RED).build();
		my.print();

	}

}
