**Meet React ecosystem**
1. React Redux: Manage our state in a React application in an effective and relatively bug free way. And to do this, it uses what's called the Flux architecture.
2. Redux Thunk (or Thunk): separate side effects of our application: allows us to do is separate out the so called side effects of our application. And side effects are permanent changes such as modifying user data on a server or uploading an article for example. And the idea is to avoid putting this logic into our components. Our components are meant to display our data. They shouldn't be worrying about making network requests and Thunk gives us a place to put this logic.
3. Reselect: The purpose of selectors is to abstract a way the details of hour our data is stored in this state.
4. Styled components: give us a nicer way of managing the appearance of our components than using separate css files particularly when the appearance of a component depends on the state in some way. 

**What we need to create a React project from scratch**
1. index.html 
2. support for ES6.
3. webpack
4. root component.
5. react-hot-loader: see the changes without having to refresh every time.

```
npm init -y
```
Initial a new npm package. Next create 2 directories: 
1. public: This will hold all the publicly accessible resources for our app just like in a regular static website.
2. src: hold our actual react code.

Create index.html inside the public directory. It will be sent to the client when they request to our site.
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>React eco-system</title>
</head>
<body>
    <div id="root"></div>
    <noscript>
        Please enable Javascript to view this site.
    </noscript>
    <script src="../dist/bundle.js"></script>
</body>
</html>
```
We know that dist/bundle.js is not there, but we will have it soon.

_Supporting ES6_
We are going to write our React code using ES6 syntax and we're also going to need to add support for JSX, React's special HTML-like syntax for defining page layouts. 
```
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react
```
We need to create .babelrc file. This file will tell the Babel transpiler what presets and plugins to use to transpile our code. 
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```
babel/preset-env which handles the transformation of ES6 into common JS, and @babel/preset-react which knows how to deal with JSX properly. Babel will use both of these presets to transform our code into something a browser can run, although most modern browsers now support ES6 syntax so this isn't as necessary as it once was. 

_The index.js file and the app component_
So we create 3 files under our src folder:
1. index.js: this will contain the code that inserts our react app into our index.html page.
2. App.js
3. App.css

App.js and App.css contain the code and the styling respectively, for the root component of our application, which for now will be the only component in our application.
Check the code from the commit "Chapter 2: The index.js and the app component".

Install React as below:
```
npm install react react-dom
```
**Building and Serving with webpack**
```
npm install --save-dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader
```
What we are going to have webpack do for us is to take the code in our source directory and perform some operations on it like converting the ES6 syntax and JSX common JS and then host our public directory so that we can view our app in a browser. 

Create a webpack.config.js that will allow us to define what exactly we want webpack to do with our source code.

Entry point for webpack will be:
```
entry: './src/index.js',
```
Specify the development mode here: `` mode: 'development',``. Now we have to specify our rules for exactly how we want webpack to transform our code.
First rule we will define transform our ES6 code to regular javascript:
```
rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
```
Test will match all JS and JSX files. We don't want to look inside our node modules folder so we have exclude path. Then the loader we want to use is babel-loader and finally we want to specify options that is going to say presets babel/env.

Next we want to add the style loader and the CSS loader, and that allow us to do this thing where we import a CSS file at the top of our React Component such as:
```
import './App.css';

const App = () => (
    <div className="App">
        <h1>Hello world</h1>
    </div>
);
```
In order to run the project, do as the below:
```
npx webpack-dev-server --mode development
```
You can navigate to http://localhost:3000 and see the app we just created.

Look at the commit: 'Chapter 2: Building and serving with webpack'

_Hot reloading with react-hot-loader_
The problem is whenever we make a change to our code, we have to physically refresh our browser in order to see the changes.

```
npm install --save-dev react-hot-loader
```

After that, stop the process. Inside the App.js, import the hot:
```
import { hot } from 'react-hot-loader';
```

And at the end:
```
export default hot(module)(App);
```

Run the process again and you will see the change automatically without refreshing the browser.

In package.json, add another script:
```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "npx webpack-dev-server --mode development"
  },
```
Now we can open a terminal and run 
```
npm run dev
```
One more thing to note here is that while we're running our webpack server, there isn't a dist folder as we might expect. That's because when webpack dev server does is holds this dist folder in memory and serves it, and then deletes it when we stop it.
If we want to actually build our react app so we can see files. Create a new script:
```
 "build": "npx webpack --mode development"
```
And you can run ``npm run build`` , you can see dist folder is created and bundle.js file is created.

Check the commit "Chapter 2: Hot-reloading with react-hot-loader"

**Create the todoList component**
Check the commit "Chapter 2: Putting the app together"
The app is very basic with ```const TodoList = ({ todos = [{text:"Hello"}] }) => (
                                  <div className="list-wrapper">
                                      <NewTodoForm />
                                      {todos.map(todo => <TodoListItem todo={todo} />)}
                                  </div>
                              );``` and you can see Hello is a hard-code item.

**Why do you need Redux**
What's the best way "for us to manage state in our application?"

One way: we could take a rather extreme position and have 1 central state contained by the route component and then have it pass down pieces of that state to all its children. But this is usually a pretty bad idea.
Second way: A single centralized state that all components have unrestricted access to. So there's no props drilling because components can just access whatever data they need directly, and there's no problem sharing states since by default all components share the entire state in this situation. In practice it can be a nightmare.
Why? There are no rules for how to actually interact with or access the state. So what you end up with and all, but the most disciplined code bases is an application filled with these transient hard to recreate bugs that occur because of inconsistencies in the state. With the exception of the lack of rules and the subsequent chaos when using a global state, having a global state does solve the other 2 problems we mentioned. Sharing state and excess props drilling. So what if we were to take this idea of global state and solve its main problem by adding some strict rules and organization to it? 

**Redux store**
Anything we load from a server or any internal application state that we need to keep track of can be put into the Redux store.

Redux store: Contains the state of our application.
Redux actions (reducers): are json objects, consiting of 2 things, an action type, which is basically just a string naming the action, and a payload that contains the actual user data that we just fetched from the server. Or we could have an action with the type: item added to cart with a payload that 
contains the idea of the item that user just added to their shopping cart.

Reducers on the other hand are Redux's way of specifying what should happen to our Redux store, 
our central state when a given action occurs. We might say that when a user data loaded action occurs,
 we set the user property in the Redux store to the user data that's in the action's payload.
  Or when an item added to cart action occurs, we add whatever item is in the payload, 
  to the array of items in the shopping cart property of our Redux store.
  Our components are only allowed to make changes to the state by triggering these predefined actions and the only changes to the state 
  that are allowed to take place in our application are corresponding changes that we specify in our reducers.
  
  
UI trigger actions --> state is updated --> components see updated state

**Adding Redux to a React app**
```
npm install redux react-redux
```
First: create a store.js with the following code under src folder:

```
import { createStore, combineReducers} from "redux";
// Put all reducers defined later on here
const reducers = {};

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(rootReducer);
```

Next, we need to open our index.js and wrap the whole app inside what we called the Redux provider.

The code will be as below: 

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from "./store";
import App from './App.js';

ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>,
    document.getElementById("root"));
```

**Creating Redux actions**
Create some actions and reducers that our application can use to help keep track of its state.
Inside `src/todos` create a file called actions.js.
```
export const CREATE_TODO = 'CREATE_TODO';
export const createTodo = text => ({
    type: CREATE_TODO,
    payload: { text },
});
// Way to pass the data to action
// createTodo('Go to the store');

export const REMOVE_TODO = 'REMOVE_TODO';
export const removeTodo = text => ({
    type: REMOVE_TODO,
    payload: { text }
});
```

Inside `src/todos` add a file called reducers.js:

````
export const todos = (state, action) => {
}
````
Anytime any actions were fired from anywhere in our application, our reducers will get called.
Once this happens, 2 arguments will be passed into our reducers are the current state of whatever resources
the reducers managing, in this case is an array of todo items managing in our application, and the second argument is the action triggered, 
which will be the object with type and payload properties.

So what reducers do is taking the current state and the action that was triggered, and decide what changes should be 
done for the current state as the result of this action.It should return the updated state and Redux will take this 
returned value and set the current state to that.

Final reducers.js:
```
import { CREATE_TODO, REMOVE_TODO} from "./actions";
export const todos = (state = [], action) => {
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
        default:
            return state;
    }
}
```

We have our todos reducer defined, we just have to open up our store.js file, we're going to import our todos reducer that we just defined. 

Under store.js:

```
const reducers = {
    todos,
};
```
**Connecting components to the store**

At NewTodoForm:
```
import { connect } from 'react-redux';
```
Connect is what we call a higher order function which in this case simply means that we call it with 2 different set of arguments.
Something like this:

```
connect()()
```
The second argument we pass to the connect function is the component we want to connect to the Redux store.

```
export default connect()(NewTodoForm);
```

For the code, check commit "Chapter 3: Adding Redux"

One thing that we may need to address is that when we refresh the page, our entire Redux state is lost 
and starts over from scratch.
So to ensure that the state of our application is kept through a browser refresh or some related event, we'll be 
using something called Redux Persist. 
**Redux Persist / Persisting the Redux store**
```
npm install redux-persist
```
Once we finish, we need to make changes in our store.js and index.js.
In our store.js:

```
import { persistReducer} from "redux-persist";
import storageSession from 'redux-persist/es/storage/session'
import autoMergeLevel2 from "redux-persist/types/stateReconciler/autoMergeLevel2";
```

Under:
```
const persistedReducer = persistReducer(persistConfig, rootReducer);
```
We haven't defined persistConfig yet, this is an object that tell Redux Persist how to save and where to store our application's data.
```
const persistConfig = {
    key: 'root',
    storage: storageSession,
    stateReconciler: autoMergeLevel2,
}
```

And remember to export a correct reducer:
```
export const configureStore = () => createStore(persistedReducer);
```
Move to index.js:
```
import { persistStore} from "redux-persist";
import { PersistGate} from "redux-persist/types/integration/react";
```

Under:
```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from "./store";
import App from './App.js';
import { persistStore} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const store = configureStore();
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}
        loading={<div>Loading...</div>}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root"));

```

**Redux Best Practices**
_When you connect components to the Redux store, your file should export both the unconneted and connected versions of that component_
```
export const TodoList = ...
export default connect(...)(TodoList); // Our application
```

Your tests shouldn't care whether your component is connected or not. Your tests should simply see whether or not your component renders with correct JS given a specific set of props.

_Keep Redux actions and async operations out of your reducers._

You should never trigger any other actions from inside your reducers or perform any kind of asynchronous operations such as fetching data from the network.

You should remember that reducers are meant to take the current state of the Redux store and combine it with an action to get the updated state. 

_Think carefully about connecting components. Connecting a given component to the Redux store has the potential to make that component less reusable from the point of view of the rest of our application._

Think about TodoList component. It's hardwired to display all of the todos in our Redux store. And this works since that's how our application is designed. However if we want to reuse this TodoList 
elsewhere in our app and display different collections of todos, example completed todos and the other one display all uncompleted todos. It wouldn't make sense to have our TodoList component 
connected to the store. It would make more sense to have some parent component that was connected to the store and have it simply display 2 identical todo list but with different data.

**Redux Thunk**
Even with Redux in place, our components still have to contain the logic for doing all the asynchronous operation, such as fetching or updating server data. We call these softs of operations side effects.

Conceptually we want our components to have 1 concern: correctly displaying data given to them. So these side effects should be moved out of components. We can use side-effect libraries in our application: Redux Thunk or Redux Saga.

Redux Saga is more popular but Redux Thunk is simpler. 

_How does Redux Thunk work_
Redux Thunk works by sort of tapping into the normal Redux dataflow. That is, if we have our normal unidirectional dataflow, where our components trigger actions, 
those actions cause predictable changes to the data in our Redux store, and these data changes are then reflected in our coponents, Redux Thinks allows us to add a sort of fork into this loop where 
we can put the logic for our side effects.

Component dispatch some actions to reducers and to redux store, or component dispatch some thunk, and it fetches some data from the server.

We have a user profile page, we want app loads user data from the server.
Without Redux Thunk, we fetch data from componentDidMount, or useEffect hooks, once data is loaded, we dispatch load_user_success or load_user_error to redux.

We don't want that happens in our component!


Redux action: dispatch({ type, payload });

Redux Thunk we dispatch a function.

```
npm install redux-thunk redux-devtools-extension @babel/runtime
npm install --save-dev @babel/plugin-transform-runtime
```
Add @babel/plugin-transform-runtime to our .babelrc:

```
 "plugins": [
    "@babel/plugin-transform-runtime"
  ]
```

Under our store.js:

```
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import {createStore, combineReducers, applyMiddleware} from "redux";

export const configureStore = () => createStore(
    persistedReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);
```

_Create a thunk_

Create thunks.js inside `src>todos`

```
export const displayAlert = () => () => {
    alert('Hello');
}
```
(It's a function inside a function)

So to demo, we modify our TodoList,js:

```
const mapDispatchToProps = dispatch => ({
    onRemovePressed: text => dispatch(removeTodo(text)),
    onCompletedPressed: text => dispatch(markTodoAsCompleted(text)),
    onDisplayAlertClicked: () => dispatch(displayAlert())
})

```
Pass it to TodoList component props:
```
const TodoList = ({ todos = [], onRemovePressed, onCompletedPressed, onDisplayAlertClicked }) => (
    <div className="list-wrapper">
        <NewTodoForm />
        {todos.map((todo, i) => <TodoListItem todo={todo} key={i} onRemovePressed={onRemovePressed}
                                              onCompletedPressed={onDisplayAlertClicked} />)}
    </div>
);
```

We have a mock server (assuming) with:

GET /todos 
POST /todos (unique id, createdAt, isCompleted)
POST /todos/:id/completed
DELETE /todos/:id

Head to `src/todos/thunks.js`,
```
export const loadTodos = () => async (dispatch, getState) => {

}
```
The function we return here gets passed 2 arguments when the thunk is triggered. Dispatch which we can use to dispatch other redux action 
from inside our thunk and getState, which is a function that we can use to get access to the current state of the redux store.

Comes to actions.js:

```
export const LOAD_TODOS_IN_PROGRESS = 'LOAD_TODOS_IN_PROGRESS';
export const loadTodosInProgress = () => ({
    type: LOAD_TODOS_IN_PROGRESS,
});

export const LOAD_TODO_SUCCESS = 'LOAD_TODO_SUCCESS';
export const loadTodosSuccess = todos => ({
    type: LOAD_TODO_SUCCESS,
    payload: { todos },
});

export const LOAD_TODOS_FAILURE = 'LOAD_TODO_FAILURE';
export const loadTodosFailure = () => ({
    type: LOAD_TODOS_FAILURE
});
```

Inside Thunks.js:
```
export const loadTodos = () => async (dispatch, getState) => {
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
```

Check the commit "Chapter 4: Redux Thunk"

**Selectors**
1. Components: displaying data we give them.
2. Reducers: worry about making changes to the state
3. Thunks: handle all of the side-effect logic and server communication.

```
const mapStateToProps = state => ({
    todos: state.todos,
    isLoading: state.isLoading
})
```

Getting the data we need rom the state in this way requires our components, and more our mapStateToProps function to have an intimate knowledge of how our data 
is stored in the state.

We can do as below:
```
const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    todos: getTodos(state),
})
```
If we created and used these functions from the start, incorporating the isLoading property into our todos reducer, and moving the actual todos array into todos.data, or making 
any other modifications to how our data is stored in the state of that matter, all of this would be a simple one line change.

Often times, we want to pass our component's data that requires a little bit of computation to obtain. For example, if we had separate to-do lists for the todos that were 
completed, and todos that were incomplete, this would require either our components or our mapStateToProps to include filtering logic. Neither of which is ideal.

Another reason for selectors to exist: to give us a place to put the logic for transforming data in the store into data our components can use. We can simply use 
getCompletedTodos and getIncompleteTodos, each of which contains the logic necessary for filtering all the todos in the redux store into specific sub-lists. 


For example, currently we have:

```
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
```
We can use selector and reducers to modify the way we want to structure, and we don't need to modify the whole code.

_Combing selectors with Reselect_

Topic: We want to separate 2 todo list: 1 is completed, 1 is not completed.

First of all, we think we can put somewhere under props of TodoList.js:
```
const mapStateToProps = state => ({
    todos: getTodos(state),
    isLoading: getTodosLoading(state)
})
```
so under the component, you can display data correctly: completed and uncompleted.

However, now we have selectors, we think that a good way is to implement inside selectors.js

```
export const getIncompleteTodos = 
```
Here we stop for a minute. Whenever we want to use a selector that may call another selector, there is a tool called reselector that to build 
more complex logic on top of simpler selectors.

```
npm install reselect
```

```
import {createSelector} from 'reselect';

export const getIncompleteTodos = createSelector(
    getTodos,
    getTodosLoading,
    (todos, isLoading) => isLoading ? [] : todos.filter(todo => !todo.isCompleted),
);
```

We can pass with many functions there, and so on and so on..

**Styled Components**
Currently we have Component.js and Component.css:

1. We need one css for each component.
2. Let's say in some application, we have a list of items and that at any time, one of these components can be selected. Now if we 
are using CSS modules to do our styling, what we have to do is set the class on our list items dynamically depending on whether or not a given list item is selected. This is an unecessary intermediate step. It doesn't seem like this kind of logic should be directly inside our components.


Styled-Components: allow us to define styles of our components inside jss file.

Example:
```
<ListItem ~~className={item.selected ? "selected" : "not-selected"}~~ selected={true}>
```

```
import styled from "styled-components";
const BigRedText = styled.div`
      font-size: 48px;
      color: #FF0000;
`;

<BigRedText>I'm a styled component</BigRedText>
```

_Where to put our Styled Components?_

Exception: Button, modal, forms... will be another file, example user-interface.

OOP extension styled component example:

```
const TodoItemContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  margin-top: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 8px grey;
`;

const TodoItemContainerWithWarning = styled(TodoItemContainer)`
  border-bottom: ${props => (new Date(props.createdAt) > new Date(Date.now() - 8640000 * 5)) ? 'none' : '2px solid red'};
`


 const Container = todo.isCompleted ? TodoItemContainer : TodoItemContainerWithWarning;
```

**Testing**

```
npm install --save-dev mocha chai
npm install --save-dev @babel/register
```

Under package.json:

```
"test": "mocha \"src/**/*.test.js\" --require @babel/register --recursive",
```
Testing reducers.test.js:
```
import {expect} from 'chai';
import {todos} from '../reducers';

describe('The todos reducer', () => {
    it('Add a new todo when CREATE_TODO action is received', {
        var fakeTodo = {text: 'hello', isCompleted: false}
        var fakeAction = {
            type: 'CREATE_TODO',
            payload: {
                todo: fakeTodo
            }
        }
        var originalState = {isLoading: false, data: []}
        var expected = {
            isLoading: false,
            data: [fakeTodo],
        }

        var actual = todos(originalState, fakeAction)
        expect(actual).to.deep.equal(expected)
    });
});
```
Testing thunks.test.js:
```
npm install --save-dev sinon node-fetch fetch-mock
```
 Look at the function:

```
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
```

```
import 'node-fetch';
import fetchMock from 'fetch-mock';
import { expect } from 'chai';
import sinon, {fake} from 'sinon';
import { loadTodos } from "../thunks";


describe('The loadTodos thunk', () => {
    it('dispatches the actions in the success scenario', () => {
        const fakeDispatch = sinon.spy();

        // What we want to fake fetch returned?
        const fakeTodos = [{ text: '1'}, {text: '2'}];
        // When thunks get this URL, it will fake the response
        fetchMock.get('http://localhost:8080/todos', fakeTodos);

        const expectedFirstAction = { type: 'LOAD_TODO_IN_PROGRESS'};
        const expectedSecondAction = { type: 'LOAD_TODOS_SUCCESS', payload: { todos: fakeTodos }};

        await loadTodos()(fakeDispatch);

        // Define exactly what we want the actions?

        
        expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
        expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);

        fetchMock.reset();
    })
})
```

_Testing styled component_
Test the logic we put inside them.

```
const TodoItemContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  margin-top: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 8px grey;
`;

const TodoItemContainerWithWarning = styled(TodoItemContainer)`
  border-bottom: ${props => (new Date(props.createdAt) > new Date(Date.now() - 8640000 * 5)) ? 'none' : '2px solid red'};
`
```

Modify the logic so we can test:
```
export const getBorderStyleForDate = (startingDate, currentDate) => {
    return (startingDate > new Date(currentDate - 8640000 * 5) ? 'none' : '2px solid red')
}
const TodoItemContainerWithWarning = styled(TodoItemContainer)`
  border-bottom: ${props => getBorderStyleForDate(new Date(props.createdAt), Date.now())}
`
```

And set the test as below:
```
describe('getBorderStyleForDate', () => {
    it('returns none when the date is less than 5 days ago', () => {

    });
    it('returns a border when the date is more than 5 days ago', () => {

    });
})
```
