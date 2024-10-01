package com.lyn.component.common;

import java.util.EnumSet;
import java.util.Set;

public abstract class Pizza {

	enum Topping {HAM, ONION, TOMATO}
	Set<Topping> toppings;
	
	abstract static class Builder <T extends Builder<T>> {
		
		Set<Topping> toppings = EnumSet.noneOf(Topping.class);
		
		T addTopping(Topping topping) {
			toppings.add(topping);
			return self();
		}
		
		abstract T self();
		abstract Pizza build();	 
	}
	
	Pizza(Builder builder){
		this.toppings = builder.toppings;
	}
}
