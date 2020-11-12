import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { TextControl, Button, CheckboxControl } from '@wordpress/components';
import './editor.scss';

const { isEmpty } = lodash;

export default function Edit(props) {
	const [ todoList, setTodoList ] = useState([]);
	const [ todoLabel, setTodoLabel ] = useState('');
	const [ updateItem, setUpdateItem ] = useState({});

	const addTodo = () => {
		const newTodo = {
			id: Math.floor(Math.random() * 1000),
			isCompleted: false,
			label: todoLabel
		};

		setTodoList([ ...todoList, newTodo ]);
		setTodoLabel('');
	};

	const delteHandler = (id) => {
		let delteItem = todoList.filter((i) => i.id !== id);
		setTodoList(delteItem);
	};

	const updateTodoListHandler = () => {
		const { id } = updateItem;
		const updateTodoList = todoList.map((todo) => {
			if (todo.id === id) {
				return updateItem;
			}

			return todo;
		});

		setTodoList(updateTodoList);
		setUpdateItem({});
	};

	const comepleteHandler = id => {

		const updatedTodoList = todoList.map(( todo ) => {


			if ( todo.id === id ) {
				return {
					...todo,
					isCompleted: todo.isCompleted ? false : true 
				}
			}
			
			return todo;
		});

		setTodoList( updatedTodoList );
	}

	return (
		<Fragment>
			<div className="cwp_box_wrapper">
				<TextControl
					value={!isEmpty(updateItem) ? updateItem.label : todoLabel}
					onChange={(newTodo) =>
						!isEmpty(updateItem) ? setUpdateItem({ ...updateItem, label: newTodo }) : setTodoLabel(newTodo)}
				/>
				<Button isPrimary onClick={() => (!isEmpty(updateItem) ? updateTodoListHandler() : addTodo())}>
					Add Todo
				</Button>
			</div>

			<ul className="cwp_todo_list">
				{todoList.map((todo) => {
					const { id, label, isCompleted } = todo;
					return (
						<li>
							<span className={isCompleted ? 'strike-line' : ''}>{label}</span>
							<CheckboxControl 
								checked={isCompleted}
								onChange={ () => comepleteHandler( id ) }
							/>
							<span className="cwp_todo_delete" onClick={() => delteHandler(id)}>
								X
							</span>
							<span className="cwp_todo_edit" onClick={() => setUpdateItem(todo)}>
								Edit
							</span>
						</li>
					);
				})}
			</ul>
		</Fragment>
	);
}
