import {
    CREATE_TODO,
    LOAD_TODO_SUCCESS,
    LOAD_TODOS_FAILURE,
    LOAD_TODOS_IN_PROGRESS,
    MARK_TODO_AS_COMPLETED,
    REMOVE_TODO
} from "./actions";
// Return true or false based on current action of our app
export const isLoading = (state = false, action) => {
    const { type } = action;
    switch(type) {
        case LOAD_TODOS_IN_PROGRESS:
            return true;
        case LOAD_TODO_SUCCESS:
        case LOAD_TODOS_FAILURE:
            return false;
        default:
            return state;
    }
}

export const todos = (state = [], action) => {
    // Everytime any action is fired from anywhere in our application, our reducers will get called.
    // When this happens, the 2 arguments that will get passed to a reducer are the current state of whatever resource
    // the reducer is managing. In this case it's an array of the current todo items in our application.
    // The second argument is the action that was triggered which will be an object with type and payload properties.
    // So what reducer do is take the current state and the action that was triggered and decide what changes should occur in the state as the result of this action.
    // And they should return the updated state and Redux will take this returned value and set the current state to that
    const { type, payload } = action;
    switch (type) {
        case LOAD_TODO_SUCCESS: {
            const { todos } = payload;
            return todos;
        }
        case CREATE_TODO: {
            const { todo } = payload;
            return state.concat(todo);
        }
        case REMOVE_TODO: {
            // way to rename
            const { todo: todoToRemove } = payload;
            return state.filter(todo => todo.id !== todoToRemove.id);
        }
        case MARK_TODO_AS_COMPLETED: {
            const { todo: updatedTodo } = payload;
            return state.map(todo => {
                if (todo.id === updatedTodo.id) {
                    return todo;
                }
            });
        }
        case LOAD_TODOS_IN_PROGRESS:
        case LOAD_TODOS_FAILURE:
        default:
            return state;
    }
}
