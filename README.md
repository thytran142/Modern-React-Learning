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


