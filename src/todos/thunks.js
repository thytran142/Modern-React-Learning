import {
    createTodo,
    loadTodosFailure,
    loadTodosInProgress,
    loadTodosSuccess,
    markTodoAsCompleted,
    removeTodo
} from "./actions";

export const displayAlert = text => () => {
    alert(text);
}
export const loadTodos = () => async (dispatch) => {
    try{
        dispatch(loadTodosInProgress());
        const response = await fetch('http://localhost:8080/todos/');
        const todos = await response.json();
        dispatch(loadTodosSuccess(todos));
    }catch(e) {
        dispatch(loadTodosFailure());
        dispatch(displayAlert(e));
    }
}
export const addTodoRequest = text => async dispatch => {
    try{
        const body = JSON.stringify({text});
        const response = await fetch('http://localhost:8080/todos', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body,
        });
        const todo = await response.json();
        dispatch(createTodo(todo));
    }catch(e) {
        dispatch(displayAlert(e));
    }
}
export const removeTodoRequest = id => async dispatch => {
    try{
        const response = await fetch(`http://localhost:8080/todos/${id}`,
            {
                method: 'DELETE'
            });
        const removedTodo = await response.json();
        dispatch(removeTodo(removedTodo));
    }catch(e) {
        dispatch(displayAlert(e));
    }
}

export const markTodoAsCompletedRequest = id => async dispatch => {
    try{
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: 'post'
        });
        const updatedTodo = await response.json();
        dispatch(markTodoAsCompleted(updatedTodo));
    }catch(e) {
        dispatch(displayAlert(e));
    }
}