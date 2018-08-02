# Directly Training Frontend

Directly training app, is an application with **webpack**, **react** and **redux** to make additions, deletions, and modifications from users.

## Prerequisites

## Ubuntu

**install npm version, node >= 8**
  * `sudo apt-get update`
  * `sudo apt-get install nodejs`
  * `sudo apt-get install npm`

Also, you can use [nvm node version management tool](https://github.com/creationix/nvm)

**install yarn latest**
  * `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
  * `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
  * `sudo apt-get update && sudo apt-get install yarn`

## Windows

  * [Install npm](http://blog.teamtreehouse.com/install-node-js-npm-windows)
  * [Install yarn](https://yarnpkg.com/lang/en/docs/install/#windows-stable)

## Start application
  - Install packages `npm install` or `yarn install`
  - Run app: `npm start` or `yarn start`
  - By default, the application starts on http://localhost:8080
  - The backend is integrated with the API [MS BE with heroku](https://ms-labs-be.herokuapp.com) you can check the repo here: [MS BE Repository](https://github.com/MS-React/backend)
  - You can point to the local backend with the file **app/constants.js**

  >For now don't commit this **.env.development** or **constants.js** file changes

### Commands

**install packages**
```ssh
npm install
```
**start app**
```ssh
npm start
```
### Dev tools

**run tests**
```ssh
npm test
```

**run test with watch**
```ssh
test:dev
```

**linter rules**
```ssh
npm run lint
```
**sass rules**
```ssh
npm run sass-lint
```


# Error Boundary and Redux Error Middleware

## Introduction to Error Boundaries
A JavaScript error in a part of the UI shouldn’t break the whole app. To solve this problem for React users, React 16 introduces a new concept of an “error boundary”.

Error boundaries are React components that **catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI** instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

>    Note
>
>   Error boundaries do not catch errors for:
>
>        Event handlers (learn more)
>        Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
>        Server side rendering
>        Errors thrown in the error boundary itself (rather than its children)

For further reading refer to [React Documentation](https://reactjs.org/docs/error-boundaries.html)

### Error Boundary Component

A class component becomes an error boundary if it defines a new lifecycle method called componentDidCatch(error, info):
```
import React from 'react';
import { SomethingWentWrong } from './../SomethingWentWrong/SomethingWentWrong';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    errorService.logErrors(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <SomethingWentWrong />;
    }
    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

export default ErrorBoundary;
```
## Redux Errors Middleware

This is not a concept strictly taken from any recipe, it's just an idea of intercepting redux action which meaning is that something failed and do something with it's information, in this case to call the error service and keep action creators agnostic from the existence of it.

### Middleware source code

```
const errorsMiddleware = (/** store */) => next => action => {
  if (action.type.toLowerCase().includes('failed')) {
    errorService.logErrors(action.payload);
  }
  next(action);
};

export default errorsMiddleware;
```
With this approach we need to use the convention to use the **failed** word on actions with that meaning, so when something has failed e.g. a request to the serverm, and we dispatch the *...failed* action, this middleware will call the error service and then call the `next action handler
