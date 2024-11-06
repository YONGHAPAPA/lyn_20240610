import React from 'react'
import { StackPage } from './data_structure/StackPage'
import { QueuePage } from './data_structure/QueuePage'
import { SingleLinkedList } from './data_structure/SingleLinkedList'
import { DoublyLinkedList } from './data_structure/DoublyLinkedList'
import { BinarySearchTreePage } from './data_structure/BinarySearchTreePage'


export const DataStructure = () => {
	
	
	return (
		
		<section>
			<div>
				<StackPage/>
			</div>
			&nbsp;
			<div>
				<QueuePage/>
			</div>
			&nbsp;
			<div>
				<SingleLinkedList/>
			</div>
			&nbsp;
			<div>
				<DoublyLinkedList/>
			</div>
			&nbsp;
			<div>
				<BinarySearchTreePage/>
			</div>
		</section>
	)
}