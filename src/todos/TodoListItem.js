import React from 'react';

const TodoListItem = ({ todo, onRemovePressed }) => (
    <div className="todo-item-container">
        <h3>{todo.text}</h3>
        <div className="buttons-container">
            <button className="completed-button">Mark as completed</button>
            <button className="remove-button"
            onClick={() => onRemovePressed(todo.text)}
            >Remove</button>
        </div>

    </div>
)
export default TodoListItem;
