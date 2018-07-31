import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { shallow } from 'enzyme';

describe('<ErrorBoundary /> component', () => {
  function setup(props) {
    return shallow(<ErrorBoundary 
      {...props}
    />);
  }

  it('should render itself', () => {
    // Arrange
    const expectedState = {
      hasError: false
    };

    // Act
    const wrapper = setup();

    // Assert
    expect(wrapper.instance().state).toEqual(expectedState);
  });

  it('should catch components errors', () => {
    // Arrange
    const wrapper = setup();
    const error = {};
    const info = 'some info';
    const expectedState = {
      hasError: true
    };

    // Act
    wrapper.instance().componentDidCatch(error, info);
    
    // Assert
    expect(wrapper.instance().state).toEqual(expectedState);
  });
});
