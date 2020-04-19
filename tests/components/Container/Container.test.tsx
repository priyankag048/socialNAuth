import React from 'react';
import { mount, shallow } from 'enzyme';
import Container from '../../../src/components/Container/Container';

describe('Container', () => {
  const children = (<p>demoChildren</p>); 
  it('should render Head component', () => {
    const renderedComponent = mount(<Container children={children} />);
    expect(renderedComponent.exists('Head')).toBeTruthy();
  });

  it('should render children', () => {
    const renderedComponent = shallow(<Container children={children} />);
    expect(renderedComponent.find('div').props().children).toEqual(children);
  });
});