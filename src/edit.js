import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import {
	TextControl,
	Button
} from '@wordpress/components';
import './editor.scss';

const {  isEmpty } = lodash;

export default function Edit(props) {

	// todolist
	const [ todoList, setTodoList ] = useState([]);
	const [ todoLabel, setTodoLabel ] = useState('');

	// is updating?
	const [ updatingTodo, setUpdatingTodo ] = useState({});
	 

	const addTodo = () => {

		// new todo
		const newTodo = {
			id: Math.floor(Math.random() * 10000),
			isCompleted: false,
			label: todoLabel
		}

		// updating the todo list
		setTodoList([
			...todoList,
			newTodo
		])

		// removing the current value from text box

		setTodoLabel('');  
	}

	const updateTodo = () => {

		const { id } = updatingTodo;

		const updatedTodoList = todoList.map( todo => {

			if ( todo.id === id ) {
				return updatingTodo
			}

			return todo;

		} );

		setTodoList(updatedTodoList);
		setUpdatingTodo({});


	}

	const deleteTodoItem = (id) => {
		let newTodoList = todoList.filter(i => i.id !== id); // []
		setTodoList(newTodoList);
	}




	return (
	
		<div className="cwp_box_wrapper">
			<TextControl 
				value={ !isEmpty( updatingTodo ) ? updatingTodo.label : todoLabel } 
				onChange={(newTodo) => !isEmpty( updatingTodo ) ? setUpdatingTodo({ ...updatingTodo, label: newTodo }) : setTodoLabel(newTodo)}
				
			/>
			<Button isPrimary onClick={ () => !isEmpty( updatingTodo ) ? updateTodo() : addTodo() }>
				{
					!isEmpty( updatingTodo ) ? "Update Todo" : "Add Todo"
				}
			</Button>
			
			<ul className="cwp_todo_list">
               {
                todoList.map((todo, idx) => {
				   const { label, id, isCompleted } = todo;
					return(
                      <li key={idx}>
						  <span>{label}</span>
						  <span className="cwp_todo_delete" onClick={() => deleteTodoItem(id)}>X</span>
						  <span className="cwp_todo_edit" onClick={() => {
							  setUpdatingTodo( todo );
							  console.log( todo )
						  }}>Edit</span>
				 	  </li>
				   )
				})
			   }
			</ul>
			
		</div>
	
	);
}
