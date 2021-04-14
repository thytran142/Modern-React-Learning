import {
    CREATE_TODO,
    LOAD_TODO_SUCCESS,
    LOAD_TODOS_FAILURE,
    LOAD_TODOS_IN_PROGRESS,
    MARK_TODO_AS_COMPLETED,
    REMOVE_TODO
} from "./actions";

/**
 * Instead of state {
 *     data
 *     isLoading
 * }
 *  we want to convert to
 * state.todos: {
 *     data: [...],
 *     isLoading: true,
 * }
 */
const initialState = { isLoading: false, data: []};

export const todos = (state = initialState, action) => {
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
            return {
                ...state,
                isLoading: false,
                data: todos
            };
        }
        case CREATE_TODO: {
            const { todo } = payload;
            return {
                ...state,
                data: state.data.concat(todo)
            };
        }
        case REMOVE_TODO: {
            // way to rename
            const { todo: todoToRemove } = payload;
            return {
                ...state,
                data: state.data.filter(todo => todo.id !== todoToRemove.id)
            }
        }
        case MARK_TODO_AS_COMPLETED: {
            const { todo: updatedTodo } = payload;
            return {
                ...state,
                data: state.data.map(todo => {
                    if (todo.id === updatedTodo.id) {
                        return todo;
                    }
                })
            }
        }
        case LOAD_TODOS_IN_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case LOAD_TODOS_FAILURE:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}

