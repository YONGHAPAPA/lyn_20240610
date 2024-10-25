import React, {useState} from 'react'

export const DoublyLinkedList = () => {
	
	class Node {
		constructor(val){
			this.value = val
			this.next = null
			this.prev = null
		}
	}
	
	class Link {
		constructor(){
			this.head = null
			this.tail = null
			this.size = 0
		}
		
		
		
		push(val){
			
			const newNode = new Node(val);
			
			if(!this.head){
				this.head = newNode;
				this.tail = newNode;
			} else {
				newNode.prev = this.tail;
				this.tail.next = newNode;
				this.tail = newNode;
			}
			
			this.size++;
			
			return this;
		}
		
		pop(){

			let popup = null;
			
			if(this.size > 0){
				if(this.size === 1){
					//debugger;
					this.head = null; //왜 this.head, tail 둘다 null 처리해줘야 되지?.. tail 만해주면 안되나... 초기에 같은 값 참조하는데...
					this.tail = null;
				} else if(this.size > 1){
					popup = this.tail;
					
					let temp = this.tail.prev;
					temp.next = null;
					this.tail = temp;
					
					popup.prev = null;
				}
				this.size--;	
			}
			
			//console.log(popup);
			//console.log(this);
			//console.log(popup);
			
			return popup;
		}
		
		//remove from head
		shift(){
			
			let shiftHead = null;
			
			if(this.size === 0) return this;
			
			if(this.size === 1){
				shiftHead = this.head;
				this.head = null;
				this.tail = null;
			} else {
				shiftHead = this.head;
				let newHead = this.head.next;
				newHead.prev = null;
				this.head = newHead;
			}
			
			//console.log(this)
			this.size--;
			return shiftHead;			
		}
		
		
		unShift(val){
			
			let newNode = new Node(val);
			
			if(this.size === 0){
				this.head = newNode;
				this.end = newNode;
			} else {
				newNode.next = this.head;
				this.head.prev = newNode;
				let newHead = newNode; 
				this.head = newHead;
			}
			
			this.size++;
			
			//console.log(this);
			
			return this;
		}
		
		
		get(index){
			
			let runIndex = 0;
			let current = this.head;
			let selectedNode = null;
			
			if(index === 0){
				selectedNode = this.head;
				return selectedNode;
			}
			
			if(index > 0 && index < this.size){
				while(index !== runIndex){
					//console.log(current.value);
					current = current.next;
					selectedNode = current;
					console.log(current);
					runIndex++;
				}
				
				return selectedNode;	
			}
			
			if(index === this.size){
				selectedNode = this.end;
				return selectedNode;
			}
		}
		
		
		set(index, value){
			if((index >= 0 && index < this.size) && this.size > 0){
				
				let curIndex = 0;
				let current = this.head;
				
				//debugger;
				if(index === 0) {
					current.value = value;
					return this;
				}
				
				while(index !== curIndex){
					current = current.next;
					curIndex++;
				}
				
				current.value = value;
				return this;	
			}
		}
		
		
		toString(){
			
			let current = this.head;
			let output = "";
			
			while(current){
				output += current.value + ",";
				current = current.next;
			}
			
			return output;
		}
	}
	
	const [count, setCount] = useState(0)
	const [link, setLink] = useState(new Link())
	const [toggle, setToggle] = useState(false);
	const [index, setIndex] = useState('');
	const [value, setValue] = useState('');
	
	
	const onClick_push = () => {
		const newLink = link.push(count);
		//console.log(newLink);
		setCount(count+1);
		//setLink(newLink);
		//setToggle(!toggle);
	}
	
	const onClick_pop = () => {
		const popNode = link.pop();
		setToggle(!toggle);
	}
	
	const onClick_shift = () => {
		const shiftHead = link.shift();
		setToggle(!toggle);
	}
	
	
	const onClick_unShift = () => {
		
		const newLink = link.unShift(count);
		setCount(count+1);
		setToggle(!toggle)
	}
	
	
	const onClick_get = () => {
		const result = link.get(Number(index));
		alert(result.value);
		setIndex('');
	}
	
	const onClick_set = () => {
		
		//console.log(index, value);
		
		const newLink = link.set(Number(index), Number(value));
		
		console.log("newLink", newLink);
		setToggle(!toggle);
	}
	
	
	const onChange_index = (e) => {
		const regex = /^[0-9]*$/g;
		const match = regex.test(e.target.value)
		if(match){
			setIndex(e.target.value)	
		}
	}
	
	const onChange_value = (e) => {
		const re = /^[0-9]*$/g;
		const match = re.test(e.target.value);
		match && setValue(e.target.value);
	}
	
	
	return (
		<section>
			<div># Doubly Linked List</div>
			<div>output: {link.toString()}</div>
			<div>
				<button onClick={onClick_push}>push</button>
				<button onClick={onClick_pop}>pop</button>
				<button onClick={onClick_shift}>shift</button>
				<button onClick={onClick_unShift}>unShift</button>
				<br/>
				index: <input type='text' onChange={onChange_index} value={index} /><button onClick={onClick_get}>get</button>
				<br/>
				value: <input type='text' onChange={onChange_value} value={value} /><button onClick={onClick_set}>set</button>
			</div>
		</section>
	)
	
}