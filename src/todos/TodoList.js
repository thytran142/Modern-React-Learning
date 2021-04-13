import React from 'react';
import TodoListItem from "./TodoListItem";
import NewTodoForm from "./NewTodoForm";
import {markTodoAsCompleted, removeTodo} from "./actions";
import {connect} from "react-redux";

const TodoList = ({ todos = [], onRemovePressed, onCompletedPressed }) => (
    <div className="list-wrapper">
        <NewTodoForm />
        {todos.map((todo, i) => <TodoListItem todo={todo} key={i} onRemovePressed={onRemovePressed}
                                              onCompletedPressed={onCompletedPressed} />)}
    </div>
);
const mapStateToProps = state => ({
    todos: state.todos
})
const mapDispatchToProps = dispatch => ({
    onRemovePressed: text => dispatch(removeTodo(text)),
    onCompletedPressed: text => dispatch(markTodoAsCompleted(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
