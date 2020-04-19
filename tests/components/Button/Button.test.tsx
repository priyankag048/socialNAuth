import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../../src/components/Button/Button';

describe('Button Component', () => {
  let renderedComponent;
  beforeAll(() => {
    const url = 'testUrl';
    const logo = 'testImage';
    const logoAlt = 'testAltImage';
    const text = 'demoText';
    renderedComponent = shallow(<Button url={url} logo={logo} logoAlt={logoAlt} text={text}/>);
  });
  it('should render Link component', () => {
    const expectedUrl = 'testUrl';;
    expect(renderedComponent.find('Link').props().href).toEqual(expectedUrl);
  });
  it('should render Image component', () => {
    const logo = 'testImage';
    const logoAlt = 'testAltImage';
    expect(renderedComponent.find('img').props().src).toEqual(logo);
    expect(renderedComponent.find('img').props().alt).toEqual(logoAlt);
  });
  it('should render span component', () => {
    const text = 'demoText';
    expect(renderedComponent.find('span').text()).toEqual(text);
  });
});