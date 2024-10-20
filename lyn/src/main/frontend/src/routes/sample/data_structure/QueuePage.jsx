import React, {useState} from 'react'



export const QueuePage = () => {
	class Node {
		constructor(val){
			this.value = val;
			this.next = null;
		}
	}
	
	class Queue {
		constructor(){
			this.first = null; 
			this.last = null;
			this.size = 0;
		}
		
		enqueue(val){
			const newNode = new Node(val);
			//debugger;
			
			if(!this.first){
				this.first = newNode;
				this.last = newNode;
			} else {
				this.last.next = newNode;
				this.last = newNode;
			}
			
			this.size = ++ this.size;	
		}
		
		dequeue(){
			let output = null;
			
			if(this.size != 0){
				const temp = this.first;
				//console.log(this.first.next);
				this.first = this.first.next;
				this.size = --this.size;
				
				console.log(temp.value);
				
				output = temp.value;
			} 

			return output;
		}
	}
	
	const initQueue = new Queue();
	const [count, setCount] = useState(0);
	const [queue, setQueue] = useState(initQueue);
	
	const onClick_enqueue = () => {
		queue.enqueue(count);
		
		setCount(count+1);
		setQueue(queue);		
	}
	
	const onClick_dequeue = () => {
		const outQueue = queue.dequeue();
		setQueue(queue);
		console.log("outQueue", outQueue);
	}
	
	
	const QueueResult = () => {
		
		//console.log(queue);
		return (
			<div>
				output:  
			</div>
		)
	} 
	
	
	
	return(
		<section>
			<div># Queue</div>
			<div><button onClick={onClick_enqueue}>enqueue</button> <button onClick={onClick_dequeue}>dequeue</button></div>
			<div><QueueResult/></div>
		</section>
	)
}