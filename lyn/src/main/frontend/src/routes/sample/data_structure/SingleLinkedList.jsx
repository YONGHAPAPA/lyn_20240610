import React, { useState } from 'react'


export const SingleLinkedList = () => {
	
	class Node {
		constructor(val){
			this.value = val
			this.next = null
		}
	}
	
	
	
/*	class Link {
		constructor(){
			this.head = null;
			this.tail = null;
			this.size = 0
		}
		
		push(val){
			
			//console.log("val", val);
			const newNode = new Node(val)
			
			this.tail = this.head;
			
			if(!this.head){
				this.head = newNode
				this.tail = newNode
			} else {
				//첫번째 방법으로 해도 되는데 두번째 방법이 더 간결하고 보기 편함.. 두번째 방법은 Javascript의 객체 참조에 대한 이해도가 좀 필요하겠네.
				 WAY01 
				
				let current = this.head; 
				while(current.next){
					//마지막 노드찾기
					current = current.next
				}
				
				console.log(current);
				
				current.next = newNode
				this.tail = newNode;
				
				
				//console.log(newNode)
				//console.log(this.tail)
				
				 WAY 02 
				
				this.tail.next = newNode
				this.tail = newNode
				
			}
			
			this.size++
			
			//console.log(this);
			
			return this;
		}
		
		reverse(){

			//debugger;
			var current = this.head;
			let node = null;
			let prev = null;
			
			while(current){
				//node = Object.assign({}, current) //객체복사 하지 않으면 current 변경될때 같이 변함 주의
				node = {...current} //객체복사 ES6 spread operator
				node.next = prev;
				
				if(!prev){
					this.tail = {...node};
				} 
				
				prev = node;
				current = current.next;
			}
			
			this.head = {...node};
			
			return this
		}
		
		toString(){

			let current;
			let linkValue = "output: ";
			
			//debugger;
			
			if(this.head){
				current = this.head;
				linkValue +=  this.head.value;
				
				while(current.next){
					current = current.next;
					linkValue += "," + current.value
				}	
			}
			
			//console.log("toString", linkValue);
			
			return (<>{linkValue}</>)
		}
	}
	*/
	
	
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
				//this.head.next == this.tail 처리
				this.tail.next = newNode;   
				this.tail = newNode;
			}
			
			this.size++;
			
			//console.log(this.size);
			
			return this;
		}
		
		
		reverse(){
			let current = this.head;
			let reverse = null;
			let temp = null
			
			while(current){
				temp = {...current};
				temp.next = reverse; 
				
				if(!reverse) this.tail = temp;
				
				reverse = temp;
				current = current.next;
			}
			
			this.head = reverse
			return this;	
		}
		
		pop(){
			
			//let current2 = this.head;
			console.log(this.size);
			
			if(this.size === 0){
				return null;
			} 
						
			let popup = null
			
			if(this.size === 1){
				popup = this.head
				this.head = null;
				this.tail = null;
				this.size--;
				return this;
			}
			
			let current = this.head;
			let newTail = current
			
			while(current.next){
				newTail = current;
				current = current.next;
			}
			
			//console.log(newTail);
			this.tail = newTail;
			popup = newTail.next;
			this.tail.next = null;
			this.size--;
			
			return this;
		}
		
		
		shift(){
			
			if(this.size === 0) return this;
			
			if(this.head === this.tail) {
				this.head = null;
				this.tail = null;
			}
			
			if(this.head){
				let current = this.head;
				this.head = current.next;
			}
			
			this.size--;
			
			return this
		}
		
		
		unShift(val){
			const newNode = new Node(val);
			
			if(this.size === 0){
				this.head = newNode;
				this.tail = newNode;
				this.size++;
				return this;
			}
			
			newNode.next = this.head;
			this.head = newNode;
			this.size++;
			
			return this;
		}
		
		get(index){
			if(index > this.size || index < 0){
				return null;
			}
			
			let curIndex = 0;
			const getIndex = Number(index);
			
			let current = this.head;
			let selectedNode = null;
			
			while(curIndex !== getIndex){
				//console.log(curIndex, getIndex);
				current = current.next;
				curIndex++
			}
			
			return current;
		}
		
		
		set(index, val){
			
			
			console.log(index, this.size);
			//return;
			
			
			if(Number(index) > this.size || Number(index) < 0){
				return null;
			}
			
			if(Number(index) === this.size) {
				this.tail.value = val;
				return this;
			}
			
			//console.log(index, val);
			const newNode = new Node(val);
			
			if(Number(index) === 0){
				this.head.value = val;
				return this	
			}
			
			let current = this.head;
			let curIndex = 0;
			let selectedNode = null;
			
			
			while(Number(index) !== curIndex){
				curIndex++;
				
				console.log(current);
				
				current = current.next;
			}
			
			current.value = val;
			
			//console.log(selectedNode);
			
			
			console.log(this.head);
			
		}
		
		
		toString(){
			let current = this.head;
			let output = "output: ";
			
			while(current){
				output += current.value + ",";
				current = current.next;
			}
			return output;
		}
	}
	
	
	const [count, setCount] = useState(0);
	//let link = new Link();	//화면이 갱신되니까 COUNT변경될때 마다 초기화. react 에서는 useState 로 처리
	const [link, setLink] = useState(new Link());
	const [toggle, setToggle] = useState(false);
	const [getIndex, setGetIndex] = useState('');
	const [newLinkValue, setNewLinkValue] = useState('');
	
	const onClick_push = () => {
		const newLink = link.push(count);
		setCount(count+1);
		setLink(newLink);
	}
	
	const onClick_pop = () => {
		const newLink = link.pop()
		setToggle(!toggle);
	}
	
	const onClick_reverse = () => {
		const nLink = link.reverse();
		setLink(nLink);
		setToggle(!toggle) //화면갱신용
	}
	
	const onClick_shift = () => {
		const newLink = link.shift();
		setToggle(!toggle);
	}
	
	const onClick_unShift = () => {
		//console.log(count);
		const newLink = link.unShift(count);
		setCount(count+1);
		setToggle(!setToggle);
	}
	
	const onClick_get = (e, getIndex) => {
		const node = link.get(getIndex);
		//console.log("get", node);
	}
	
	
	const onClick_set = (e, index, value) => {
		const newLink = link.set(index, value);
		setToggle(!toggle);
	}
	
	const onChange_get_index = (e) => {
		//숫자만 입력가능처리
		const re = /^[0-9]*$/g;
		let result = re.test(e.target.value);
		result && setGetIndex(e.target.value);
		
		//console.log(getIndex, e.target.value);
	}
	
	const onChange_link_value = (e) => {
		const re = /^[0-9]*$/g;
		let result = re.test(e.target.value);
		result && setNewLinkValue(e.target.value);
	}
	
	const renderLink = () => {
		return(
			<section>{link.toString()}</section>
		)
	}
	
	
	return (
		<section>
			<div># Single Linked List</div>
			<div>{renderLink()}</div>
			<div>
				<button onClick={onClick_push}>push</button>
				<button onClick={onClick_reverse}>reverse</button>
				<button onClick={onClick_pop}>pop</button>
				<button onClick={onClick_shift}>shift</button>
				<button onClick={onClick_unShift}>unShift</button>
				<div>
					index:<input  type='text' value={getIndex} onChange={onChange_get_index}/><button onClick={(e)=>onClick_get(e, getIndex)}>get</button><br/>
				 	value:<input type="text" value={newLinkValue} onChange={onChange_link_value} /><button onClick={(e)=>onClick_set(e, getIndex, newLinkValue)}>set</button>
				 </div>
			</div>
		</section>
	)
}