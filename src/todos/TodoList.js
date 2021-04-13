import React, {useEffect} from 'react';
import TodoListItem from "./TodoListItem";
import NewTodoForm from "./NewTodoForm";
import {markTodoAsCompleted, removeTodo} from "./actions";
import {connect} from "react-redux";
import {loadTodos, markTodoAsCompletedRequest, removeTodoRequest} from "./thunks";

const TodoList = ({todos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);
    const loadingMessage = <div>Loading todos...</div>
    const content =  (<div className="list-wrapper">
                <NewTodoForm/>
                {todos.map((todo, i) => <TodoListItem todo={todo} key={i} onRemovePressed={onRemovePressed}
                                                      onCompletedPressed={onCompletedPressed}/>)}
            </div>
        );
    return isLoading ? loadingMessage : content;
    }
;
const mapStateToProps = state => ({
    todos: state.todos,
    isLoading: state.isLoading
})
const mapDispatchToProps = dispatch => ({
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
    startLoadingTodos: () => dispatch(loadTodos())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
