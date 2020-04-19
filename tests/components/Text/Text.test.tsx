import React from 'react';
import { shallow } from 'enzyme';
import Text from '../../../src/components/Text/Text';

describe('Text Component', () => {
  let renderedComponent;
  beforeAll(() => {
    const title = 'test';
    const value = 'testValue';
    renderedComponent = shallow(<Text title={title} value={value}/>);
  });
  it('should render p', () => {
    expect(renderedComponent.type()).toEqual('p');
  });
  it('should render strong', () => {
    const title = 'test:';
    expect(renderedComponent.exists('strong')).toBeTruthy();
    expect(renderedComponent.find('strong').text()).toEqual(title);
  })
});