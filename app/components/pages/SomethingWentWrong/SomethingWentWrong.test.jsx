import React from 'react';
import { shallow } from 'enzyme';
import { SomethingWentWrong } from './SomethingWentWrong';

function setup(props) {
  return shallow(<SomethingWentWrong {...props} />);
}

describe('<SomethingWentWrong /> component', () => {
  it('renders itself', () => {
    // Arrange Act
    const wrapper = setup({});

    // Assert
    expect(wrapper.find('.sww--container')).toHaveLength(1);
    expect(wrapper.find('.sww--wrapper')).toHaveLength(1);
  });
});
