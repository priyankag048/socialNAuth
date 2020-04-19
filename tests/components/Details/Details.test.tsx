import React from "react";
import { mount, shallow } from "enzyme";
import Details from '../../../src/components/Details/Details';

describe('Details Component', () => {
  const children = (<p>demoChildren</p>); 
  it('should render article', () => {
    const renderedComponent = mount(<Details children={children}/>);
    expect(renderedComponent.exists('article')).toBeTruthy();
  });
  it('should render children', () => {
    const renderedComponent = shallow(<Details children={children}/>);
    expect(renderedComponent.find('article').props().children).toEqual(children);
  });
});