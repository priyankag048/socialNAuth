import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../../src/components/Spinner/Spinner';

describe('Spinner Component', () => {
  it('should render div', () => {
    const renderedComponent = shallow(<Spinner/>);
    expect(renderedComponent.type()).toEqual('div');
  });
});