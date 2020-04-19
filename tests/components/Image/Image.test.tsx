import React from 'react';
import { shallow } from 'enzyme';
import Image from '../../../src/components/Image/Image';

describe('Image Component', () => {
  let renderedComponent;
  beforeAll(() => {
    const url= 'testUrl';
    const picture= 'testImage';
    const alt = 'testImageAlt';
    const text = 'test';
    renderedComponent = shallow(<Image url={url} picture={picture} alt={alt} text={text}/>);
  });
  it('should remder img', () => {
    const picture= 'testImage';
    const alt = 'testImageAlt';
    expect(renderedComponent.find('img').props().src).toEqual(picture);
    expect(renderedComponent.find('img').props().alt).toEqual(alt);
  });
  it('should remder anchor', () => {
    const url= 'testUrl';
    const text = 'test';
    expect(renderedComponent.find('a').props().href).toEqual(url);
    expect(renderedComponent.find('a').props().rel).toEqual('noreferrer');
    expect(renderedComponent.find('a').text()).toEqual(text);
  });
})