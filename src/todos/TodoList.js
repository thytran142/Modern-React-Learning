import React from 'react';
import TodoListItem from "./TodoListItem";
import NewTodoForm from "./NewTodoForm";
import {removeTodo} from "./actions";
import {connect} from "react-redux";

const TodoList = ({ todos = [], onRemovePressed }) => (
    <div className="list-wrapper">
        <NewTodoForm />
        {todos.map((todo, i) => <TodoListItem todo={todo} key={i} onRemovePressed={onRemovePressed}/>)}
    </div>
);
const mapStateToProps = state => ({
    todos: state.todos
})
const mapDispatchToProps = dispatch => ({
    onRemovePressed: text => dispatch(removeTodo(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
