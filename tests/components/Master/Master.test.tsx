import React from 'react';
import { shallow } from 'enzyme';
import Master from '../../../src/components/Master/Master';

describe('Master Component', () => {
  it('should render children', () => {
    const children = (<p>Demo</p>);
    const renderedComponent = shallow(<Master children={children}/>);
    expect(renderedComponent.type()).toEqual('aside');
    expect(renderedComponent.props().children).toEqual(children);
  });
});