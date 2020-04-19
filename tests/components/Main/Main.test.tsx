import React from 'react';
import { shallow } from 'enzyme';
import Main from '../../../src/components/Main/Main';

describe('Main Component', () => {
  it('should render children', () => {
    const type = 'column';
    const children = (<p>Demo</p>);
    const renderedComponent = shallow(<Main type={type} children={children}/>);
    expect(renderedComponent.props().children).toEqual(children);
  });
});