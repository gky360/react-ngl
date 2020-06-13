import React from 'react';
import { shallow } from 'enzyme';
import { Hello } from './Hello';

describe('<Hello />', () => {
  test('returns a greeting.', () => {
    const wrapper = shallow(<Hello name="world" />);
    expect(wrapper).toHaveText('Hello, world');
  });
});
