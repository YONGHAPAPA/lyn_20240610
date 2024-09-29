package com.lyn.component.common;

import java.util.EnumSet;
import java.util.Set;

public abstract class Pizza {
	
	/* version 1 */
	/*
	public enum Topping {HAM, SAUSAGE, ONION, TOMATO};
	public Set<Topping> toppings;
	public int size;
	
	abstract static class Builder {
		
		EnumSet<Topping> toppings = EnumSet.noneOf(Topping.class);
		int size;
		
		public Builder addTopping(Topping topping) {
			toppings.add(topping);
			return this;
		}
		
		public Builder size(int val) {
			this.size = val;
			return this;
		}
		
		abstract Pizza build(); 
		
	}
	
	public Pizza(Builder build) {
		this.toppings = build.toppings;
		this.size = build.size;
	}
	*/
	
	/* version 2 */
	public enum Topping {HAM, ONION, TOMATO};
	public Set<Topping> toppings;
	public int size;
	
	abstract static class Builder <T extends Builder<T>>{
		
		Set<Topping> toppings = EnumSet.noneOf(Topping.class);
		int size;
		public T addTopping(Topping topping) {
			
			this.toppings.add(topping);
			return self();
		}
		
		public T size(int val) {
			this.size = val;
			return self();
		}
		
		protected abstract T self();
		
		abstract Pizza build(); 
	}
	
	
	Pizza(Builder builder){
		toppings = builder.toppings;
		size = builder.size;
	}
	
}
