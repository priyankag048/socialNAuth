import React from "react";
import { mount, shallow } from "enzyme";
import Details from '../../../src/components/Header/Header';

describe('Header Component', () => {
  let renderedComponent;
  beforeAll(()=> {
    const logo = 'testLogo';
    const logoalt = 'testLogoAlt';
    const title = 'testTitle';
    renderedComponent = shallow(<Details logo={logo} logoAlt={logoalt} title={title}/>);
  })
  it('should render image', () => {
    const logo = 'testLogo';
    const logoalt = 'testLogoAlt';
    expect(renderedComponent.childAt(0).exists('img')).toBeTruthy();
    expect(renderedComponent.childAt(0).find('img').props().src).toEqual(logo);
    expect(renderedComponent.childAt(0).find('img').props().alt).toEqual(logoalt);
  });
  it('should render title', () => {
    const title = 'testTitle';
    expect(renderedComponent.childAt(0).text()).toEqual(title);
  });
  it('should render Link', () => {
    expect(renderedComponent.childAt(1).exists('Link')).toBeTruthy();
    expect(renderedComponent.childAt(1).find('Link').props().href).toEqual('/');
  });
  it('should render HomeIcon', () => {
    expect(renderedComponent.childAt(1).exists('img')).toBeTruthy();
    expect(renderedComponent.childAt(1).find('img').props().src).toEqual('/home.png');
    expect(renderedComponent.childAt(1).find('img').props().alt).toEqual('home');
  });
});