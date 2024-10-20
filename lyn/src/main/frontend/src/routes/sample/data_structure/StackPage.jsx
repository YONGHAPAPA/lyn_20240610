import React, { useState } from 'react'

export const StackPage = () => {
	const [count, setCount] = useState(0);
	 
	class Node {
		constructor(value){
			this.value = value;
			this.next = null;
		}
	}
	
	class Stack {
		constructor(){
			this.firstNode = null;
			this.lastNode = null;
			this.size = 0;
		}
		
		push(value){
			const newNode = new Node(value);
			//console.log(newNode);
			
			if(!this.firstNode){
				this.firstNode = newNode;
				this.lastNode = newNode;
			} else {
				const temp = this.firstNode;
				newNode.next = temp;
				this.firstNode = newNode;	
			}
			
			return this.size++;
		}
		
		pop(){
			if(this.firstNode){
				this.firstNode = this.firstNode.next;
				return this.size--;	
			}
		}
		
		print(){
			console.log(`[Stack]`, 'size:' + this.size, this.firstNode); 
		}
	}
	
	const initStack = new Stack();
	const [stack, setStack] = useState(initStack); 
	

	const onClick_pushStack = (e) => {
		stack.push(count);
		setCount(stack.size);
		setStack(stack);
		console.log(stack.firstNode);
	}
	
	const onClick_popStack = (e) => {
		stack.pop();
		setCount(stack.size);
		setStack(stack);
		console.log(stack.firstNode);
	}
	
	const onClick_printStack = (e) => {
		stack.print();
	}
	 

	return (
		<section>
			<div># Stack</div>
			<div>
				<button onClick={e=>onClick_pushStack()}>push</button>
				<button onClick={e=>onClick_popStack()}>pop</button>
				<button onClick={e=>onClick_printStack()}>print</button>
			</div>
		</section>
	)
}