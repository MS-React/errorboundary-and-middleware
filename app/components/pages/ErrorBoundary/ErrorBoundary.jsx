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
