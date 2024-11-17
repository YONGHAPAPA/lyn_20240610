import React from 'react'
import { useState } from 'react'
 

export const BinarySearchTreePage = () => {
	
	const [inputVal, setInputVal] = useState('');
	
	const [nodeVal, setNodeVal] = useState('');
	const [toggle, setToggle] = useState(false);
	const [treeMap, setTreeMap] = useState(null);
	
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

			//debugger;			
			const newNode = new Node(val);
			
			if(!this.root){
				//console.log(newNode);
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
				} else if (val === current.value){
					break;
				}
			}
			
			return this;
		}
		
		getChildNode(node){
			
		}
		
		
		toString(){
			class TreeNode {
				constructor(value){
					this.value = value;
					this.children = [];
				}
				
				insertChild(childTreeNode, index){
					//const childNode = new TreeNode(value);
					this.children[index] = childTreeNode;
				}
			}
			
			let treeMap = "";
			let root = this.root;
			let rootTreeNode = null;
			
			const buildTree = (pTreeNode, node) => {

				if(node){
					pTreeNode.value = node.value;
					
					if(node.left){
						const leftChildTreeNode = new TreeNode(node.left.value);
						pTreeNode.insertChild(leftChildTreeNode, 0);
						buildTree(leftChildTreeNode, node.left) 
					}
					
					if(node.right){
						const rightChildTreeNode = new TreeNode(node.right.value);
						pTreeNode.insertChild(rightChildTreeNode, 1);
						buildTree(rightChildTreeNode, node.right);
					}
				}
			}
			
			
			if(root){
				rootTreeNode = new TreeNode();

				buildTree(rootTreeNode, root);

				setTreeMap(rootTreeNode);
			}
		}
	}
	
	const RenderTree = (treeMap) => {
		//debugger;
		
		const rootTree = treeMap.treeMap;
		
		//console.log(rootTree);
		if(!rootTree) return;
		
		const rootValue = rootTree.value;
		const childTreeNode = rootTree.children;
		
		//console.log(rootValue);
		//console.log(childTreeNode);
		
		 
		
		let main = [1, 2, 3, 4, 5];
		let child = [11, 22, 33, 44, 55];
		
		const RenderChild = (child) => {
			
			if(!child) return (<></>);
			
			const data = child.data;
			
			console.log(data);
			 
			return (
				<>
					<ul>
						{data.map(node => {
							console.log(node);
							return(
								<li>
									<label>{node.value}</label>
									<RenderChild data={node.children} />
								</li>
							)
						})}
					</ul>
				</>
			)
		}
		
		
		return(
			<>
				<li>
					<label>{rootValue}</label>
					<RenderChild data={childTreeNode}/>
				</li>
			</>
		)
	}
	
	const [bst, setBst] = useState(new BinarySearchTree());
	
	
	
	class Tree {
		constructor(value){
			this.value = value;
			this.child = [];
		}
		
		insert(value){
			const newTree = new Tree(value);
			this.child[0] = newTree;
		}
	}
	
	
	const onClick_insert = () => {
		/*const tree = new Tree(0);
		tree.insert(1);
		console.log(tree);*/
		
		
		const newInputVal = inputVal + "," + nodeVal;
		setInputVal(newInputVal);
		
		if(nodeVal){
			const newBst = bst.insert(Number(nodeVal));
			newBst.toString();
		}
		
		setToggle(!toggle);
		setNodeVal('');
		//console.log(this);

		
		
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
			<div>output: {inputVal}</div>
			<div><RenderTree treeMap={treeMap}/></div>
			
			
			<div><input value={nodeVal} onChange={(e) => onChange_nodeVal(e)} /><button onClick={onClick_insert}>insert</button></div>
		</section>
	)
}

