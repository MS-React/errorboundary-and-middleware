import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Main from './Main';
import ErrorBoundary from './pages/ErrorBoundary/ErrorBoundary';

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    const { store, history } = this.props;
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Main />
          </ConnectedRouter>
        </Provider>
      </ErrorBoundary>
    );
  }
}

export default App;
