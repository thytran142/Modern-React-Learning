import React, {useEffect} from 'react';
import TodoListItem from "./TodoListItem";
import NewTodoForm from "./NewTodoForm";
import {getCompleteTodos, getIncompleteTodos, getTodos, getTodosLoading} from './selectors';
import {connect} from "react-redux";
import {loadTodos, markTodoAsCompletedRequest, removeTodoRequest} from "./thunks";
import styled from "styled-components";

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const TodoList = ({inCompleteTodos = [],completeTodos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);
    const loadingMessage = <div>Loading todos...</div>
    const content =  (<ListWrapper>
                <NewTodoForm/>
                <h3>Incomplete:</h3>
                {inCompleteTodos.map((todo, i) => <TodoListItem todo={todo} key={i} onRemovePressed={onRemovePressed}
                                                      onCompletedPressed={onCompletedPressed}/>)}
                <h3>Complete: </h3>
                {completeTodos.map((todo, i) => <TodoListItem todo={todo} key={i} onRemovePressed={onRemovePressed}
                                                            onCompletedPressed={onCompletedPressed}/>)}
        </ListWrapper>
        );
    return isLoading ? loadingMessage : content;
    }
;
const mapStateToProps = state => ({
    completedTodos: getCompleteTodos(state),
    inCompleteTodos: getIncompleteTodos(state),
    isLoading: getTodosLoading(state)
})
const mapDispatchToProps = dispatch => ({
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
    startLoadingTodos: () => dispatch(loadTodos())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
