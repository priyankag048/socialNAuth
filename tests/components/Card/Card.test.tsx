import React from 'react';
import { shallow } from 'enzyme';
import Card from '../../../src/components/Card/Card';

describe('Card Component', () => {
  let renderedComponent;
  beforeAll(()=> {
    const name = 'test';
    const url = 'testUrl';
    const children = "demoChildren";
    renderedComponent = shallow(<Card name={name} url={url} children={children}/>);
  });
  it('should render anchor', () => {
    const url = 'testUrl';
    expect(renderedComponent.find('a').props().href).toEqual(url);
    expect(renderedComponent.find('a').props().rel).toEqual('noreferrer');
  });
  it('should render paragraph', () => {
    const name = 'test';
    expect(renderedComponent.find('p').text()).toEqual(name);
  });
  it('should render children', () => {
    const children = "demoChildren";
    expect(renderedComponent.find('section').props().children).toEqual(children);
  })
});