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
			const newNode = new Node(val)
			
			if(!this.head){
				this.head = newNode
				this.tail = newNode
			} else {
				this.tail.next = newNode
				newNode.prev = this.tail
				this.tail = newNode
			}
			
			this.size++
			
			console.log(this)
			
			return this
		}
	}
	
	const [count, setCount] = useState(0)
	const [link, setLink] = useState(new Link())
	
	
	const onClick_push = () => {
		//console.log("push")
		link.push(count);
		setCount(count+1);
	}
	
	
	return (
		<section>
			<div># Doubly Linked List</div>
			<div>output:</div>
			<div><button onClick={onClick_push}>push</button></div>
		</section>
	)
	
}