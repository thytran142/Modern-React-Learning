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
Check the code from the commit 
