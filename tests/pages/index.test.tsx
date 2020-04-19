import React from 'react';
import { render } from "enzyme";
import * as utils from '../../src/utils';
import HomePage from '../../src/pages/index';

describe('HomePage Page', () => {
  let renderedComponent;
  let utilsMock;
  beforeEach(() => {
    utilsMock = jest.spyOn(utils, 'getAuthorizationUrl').mockImplementation((type)=> `/${type}/`);
    renderedComponent = render(<HomePage />);
  });
  afterEach(()=> {
    utilsMock.mockRestore();
  });
  it('should render header', () => {
    expect(renderedComponent.find('h1').text()).toEqual('Welcome to Social Network Authorization');
    expect(renderedComponent.find('h1').find('img').prop("src")).toEqual('/logo.png');
    expect(renderedComponent.find('h1').find('img').prop("alt")).toEqual('SNH');
  });
  it('should render 3 buttons', () => {
    expect(renderedComponent.find('button').length).toEqual(3);
  });
  it('should render github button', () => {
    const button = renderedComponent.find('button:nth-child(1)');
    expect(button.text()).toEqual('Login With Github');
    expect(button.find('img').prop("src")).toEqual('/github.png');
    expect(button.find('img').prop("alt")).toEqual('github');
    expect(button.find('a').prop("href")).toEqual('/git/');
  });
  it('should render google button', () => {
    const button = renderedComponent.find('button:nth-child(2)');
    expect(button.text()).toEqual('Login With Google');
    expect(button.find('img').prop("src")).toEqual('/google.png');
    expect(button.find('img').prop("alt")).toEqual('google');
    expect(button.find('a').prop("href")).toEqual('/google/');
  });
  it('should render facebook button', () => {
    const button = renderedComponent.find('button:nth-child(3)');
    expect(button.text()).toEqual('Login With Facebook');
    expect(button.find('img').prop("src")).toEqual('/facebook.png');
    expect(button.find('img').prop("alt")).toEqual('facebook');
    expect(button.find('a').prop("href")).toEqual('/facebook/');
  });
});