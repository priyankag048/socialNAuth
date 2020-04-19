import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from "enzyme";
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import Main from '../../../src/components/Main/Main';
import * as utils from '../../../src/utils';
import Facebook from '../../../src/pages/facebook/[id]';

describe('Facebook Page', () => {
  let mock;
  let useRouterMock;
  let utilsMock;
  let userDetails = {
    name: 'test',
    email: 'test@test.com',
    gender: 'female',
    birthday: '12/09/2000'
  }
  beforeAll(() => {
    useRouterMock = jest.spyOn(require('next/router'), 'useRouter')
    useRouterMock.mockImplementation(() => ({
      query: { id: 'test' },
    }))
    utilsMock = jest.spyOn(utils, 'calculateAge').mockImplementation(()=> 30);
    mock = new MockAdapter(axios);
    mock.onGet('/facebook/user/test').reply(200, userDetails);
  });

  afterAll(()=> {
    useRouterMock.mockRestore();
    utilsMock.mockRestore();
    mock.resetHistory();
  });

  it('should render header', async() => {
    let renderedComponent;
    await act(async() => {
      renderedComponent = mount(<Facebook />);
     });
    expect(renderedComponent.find('h1').text()).toEqual(`Welcome ${userDetails.name}, you have successfully logged in !!!`);
    expect(renderedComponent.find('h1').find('img').prop("src")).toEqual('/facebook.png');
    expect(renderedComponent.find('h1').find('img').prop("alt")).toEqual('facebook');
  });

  it('should render user image', async() => {
    let renderedComponent;
    await act(async() => {
      renderedComponent = mount(<Facebook />);
     });
    const main = renderedComponent.find(Main).render();
    expect(main.find('img').prop('src')).toEqual(`https://graph.facebook.com/test/picture?height=200&width=200`);
    expect(main.find('img').prop('alt')).toEqual(userDetails.name);
  });

  it('should render user name', async() => {
    let renderedComponent;
    await act(async() => {
      renderedComponent = mount(<Facebook />);
     });
    expect(renderedComponent.find('p').at(0).find('strong').text()).toEqual('Name:');
    expect(renderedComponent.find('p').at(0).find('span').text()).toEqual(userDetails.name);
  });

  it('should render user email', async() => {
    let renderedComponent;
    await act(async() => {
      renderedComponent = mount(<Facebook />);
     });
    expect(renderedComponent.find('p').at(1).find('strong').text()).toEqual('Email:');
    expect(renderedComponent.find('p').at(1).find('span').text()).toEqual(userDetails.email);
  });

  it('should render user gender', async() => {
    let renderedComponent;
    await act(async() => {
      renderedComponent = mount(<Facebook />);
     });
    expect(renderedComponent.find('p').at(2).find('strong').text()).toEqual('Gender:');
    expect(renderedComponent.find('p').at(2).find('span').text()).toEqual(userDetails.gender);
  });

  it('should render user age', async() => {
    let renderedComponent;
    await act(async() => {
      renderedComponent = mount(<Facebook />);
     });
    expect(renderedComponent.find('p').at(3).find('strong').text()).toEqual('Age:');
    expect(renderedComponent.find('p').at(3).find('span').text()).toEqual('30');
  });

  it('should call /facebook/user/test', async() => {
    const axiosSpy = jest.spyOn(axios, 'get');
    await act(async() => {
     mount(<Facebook />);
    });
    expect(axiosSpy).toHaveBeenCalledTimes(1);
    expect(axiosSpy).toHaveBeenCalledWith('/facebook/user/test');
    axiosSpy.mockRestore();
  });
  
});