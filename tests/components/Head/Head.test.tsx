import React from "react";
import { mount, shallow } from "enzyme";
import Head from '../../../src/components/Head/Head';

describe('Head Component', () => {
  const renderedComponent = shallow(<Head />);
  it('should render title', () => {
    const title = renderedComponent.find('Head').childAt(0);
    expect(title.type()).toEqual('title');
    expect(title.text()).toEqual('Social Network Authorization');
  });
  it('should render viewport meta', () => {
    const meta = renderedComponent.find('Head').childAt(1);
    expect(meta.type()).toEqual('meta');
    expect(meta.props().name).toEqual('viewport');
    expect(meta.props().content).toEqual('initial-scale=1.0, width=device-width');
  });
  it('should render description meta', () => {
    const meta = renderedComponent.find('Head').childAt(2);
    expect(meta.type()).toEqual('meta');
    expect(meta.props().name).toEqual('description');
    expect(meta.props().content).toEqual('authentication with social networking');
  });
  it('should render favicon link', () => {
    const link = renderedComponent.find('Head').childAt(3);
    expect(link.type()).toEqual('link');
    expect(link.props().rel).toEqual('shortcut icon');
    expect(link.props().href).toEqual('/favicon.ico');
  });
});