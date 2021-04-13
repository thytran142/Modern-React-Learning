import {CREATE_TODO, MARK_TODO_AS_COMPLETED, REMOVE_TODO} from "./actions";

export const todos = (state = [], action) => {
    // Everytime any action is fired from anywhere in our application, our reducers will get called.
    // When this happens, the 2 arguments that will get passed to a reducer are the current state of whatever resource
    // the reducer is managing. In this case it's an array of the current todo items in our application.
    // The second argument is the action that was triggered which will be an object with type and payload properties.
    // So what reducer do is take the current state and the action that was triggered and decide what changes should occur in the state as the result of this action.
    // And they should return the updated state and Redux will take this returned value and set the current state to that
    const { type, payload } = action;
    switch (type) {
        case CREATE_TODO: {
            const { text } = payload;
            const newTodo = {
                text,
                isCompleted: false
            };
            // not mutate the state
            return state.concat(newTodo);
        }
        case REMOVE_TODO: {
            const { text } = payload;
            return state.filter(todo => todo.text !== text);
        }
        case MARK_TODO_AS_COMPLETED: {
            const { text } = payload;
            return state.map(todo => {
                if (todo.text === text) {
                    return {...todo, isCompleted: true};
                }
            });
        }
        default:
            return state;
    }
}
