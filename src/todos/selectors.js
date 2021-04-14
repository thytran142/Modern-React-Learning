import { createSelector } from "reselect";

export const getTodos = state => state.todos.data;

export const getTodosLoading = state => state.todos.isLoading;

// Number of selectors grow, we don't need to care if state is state.data... or else., we use above selector
export const getIncompleteTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => !todo.isCompleted)
);

export const getCompleteTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => todo.isCompleted)
)
