import React from 'react'
import { useState } from 'react'
 

export const BinarySearchTreePage = () => {
	
	class Node {
		constructor(val){
			this.left = null;
			this.value = val;
			this.right = null;
		}
	}
	
	class BinarySearchTree {
		
		constructor(){
			this.root = null;
		}
			
				
		insert(val){

			const newNode = new Node(val);
			
			if(!this.root){
				console.log(newNode);
				this.root = newNode;
				return this;
			}
			
			
			let current = this.root;
			
			//debugger;
			
			while(current){
				if(val > current.value){
					if(!current.right) {
						current.right = newNode;
						return this;
					} else {
						current = current.right;
					}
				} else if (val < current.value){
					if(!current.left){
						current.left = newNode;
						return this;
					} else {
						current = current.left;
					}
				}
			}
			
			return this;
		}
		
		getChildNode(node){
			
		}
		
		
		toString(){
			
			const renderNode = (node, type) => {
			
				//console.log(node.value)
				console.log(type, node.value);
				
				if(node.left){
					renderNode(node, 'left')
				}
				
				if(node.right){
					renderNode(node, 'right')	
				}
			}
			
			let current = this.root;
			
			renderNode(current);
			
		}
	}
	
	const [bst, setBst] = useState(new BinarySearchTree());
	const [nodeVal, setNodeVal] = useState('');
	const [toggle, setToggle] = useState(false);
	
	
	
	const onClick_insert = () => {
		
		if(nodeVal){
			const nBst = bst.insert(Number(nodeVal));
			
			//console.log(nBst);
			nBst.toString();
			
			//setBst(nBst);	
		}
		
		setToggle(!toggle);
		setNodeVal('');
		
		console.log(this);
	}
	
	
	const onChange_nodeVal = (e) => {
		const re = /^[0-9]*$/;
		if(re.test(e.target.value)){
			setNodeVal(e.target.value);	
		}
	}
	

	return (
		<section>
			<div># Binary Search Tree</div>
			<div>output: </div>
			<div><input value={nodeVal} onChange={(e) => onChange_nodeVal(e)} /><button onClick={onClick_insert}>insert</button></div>
		</section>
	)
}

