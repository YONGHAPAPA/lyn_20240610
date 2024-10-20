import React from 'react'
import { StackPage } from './data_structure/StackPage'
import { QueuePage } from './data_structure/QueuePage'
import { SingleLinkedList } from './data_structure/SingleLinkedList'
import { DoublyLinkedList } from './data_structure/DoublyLinkedList'

export const DataStructure = () => {
	
	
	return (
		
		<section>
			<div>
				<StackPage/>
			</div><br/>
			<div>
				<QueuePage/>
			</div><br/>
			<div>
				<SingleLinkedList/>
			</div><br/>
			<div>
				<DoublyLinkedList/>
			</div><br/>
		</section>
	)
}