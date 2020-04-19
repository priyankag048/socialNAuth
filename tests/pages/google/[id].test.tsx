import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from "enzyme";
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import Main from '../../../src/components/Main/Main';
import Google from '../../../src/pages/google/[id]';

describe('Google Page', () => {
  let mock;
  let useRouterMock;
  let userDetails = {
    name: 'test',
    email: 'test@test.com',
    locale: 'en-IN',
    picture: 'testImg'
  }
  beforeAll(() => {
    useRouterMock = jest.spyOn(require('next/router'), 'useRouter')
    useRouterMock.mockImplementation(() => ({
      query: { id: 'test' },
    }))
    mock = new MockAdapter(axios);
    mock.onGet('/google/user/test').reply(200, userDetails);
  });

  afterAll(()=> {
    useRouterMock.mockRestore();
    mock.resetHistory();
  });
  it('should render header', async() => {
    let renderedComponent;
    await act(async() => {
      renderedComponent = mount(<Google />);
     });
    expect(renderedComponent.find('h1').text()).toEqual(`Welcome ${userDetails.name}, you have successfully logged in !!!`);
    expect(renderedComponent.find('h1').find('img').prop("src")).toEqual('/google.png');
    expect(renderedComponent.find('h1').find('img').prop("alt")).toEqual('google');
  });
  it('should render user image', async() => {
    let renderedComponent;
    await act(async() => {
      renderedComponent = mount(<Google />);
     });
    const main = renderedComponent.find(Main).render();
    expect(main.find('img').prop('src')).toEqual(userDetails.picture);
    expect(main.find('img').prop('alt')).toEqual(userDetails.name);
  });

  it('should render user name', async() => {
    let renderedComponent;
    await act(async() => {
      renderedComponent = mount(<Google />);
     });
    expect(renderedComponent.find('p').at(0).find('strong').text()).toEqual('Name:');
    expect(renderedComponent.find('p').at(0).find('span').text()).toEqual(userDetails.name);
  });

  it('should render user email', async() => {
    let renderedComponent;
    await act(async() => {
      renderedComponent = mount(<Google />);
     });
    expect(renderedComponent.find('p').at(1).find('strong').text()).toEqual('Email:');
    expect(renderedComponent.find('p').at(1).find('span').text()).toEqual(userDetails.email);
  });

  it('should render user gender', async() => {
    let renderedComponent;
    await act(async() => {
      renderedComponent = mount(<Google />);
     });
    expect(renderedComponent.find('p').at(2).find('strong').text()).toEqual('Locale:');
    expect(renderedComponent.find('p').at(2).find('span').text()).toEqual(userDetails.locale);
  });
  it('should call /google/user/test', async() => {
    const axiosSpy = jest.spyOn(axios, 'get');
    await act(async() => {
     mount(<Google />);
    });
    expect(axiosSpy).toHaveBeenCalledTimes(1);
    expect(axiosSpy).toHaveBeenCalledWith('/google/user/test');
    axiosSpy.mockRestore();
  });
});