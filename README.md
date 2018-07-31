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
