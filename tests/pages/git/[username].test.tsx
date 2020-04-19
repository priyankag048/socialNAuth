import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from "enzyme";
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import Master from '../../../src/components/Master/Master';
import Details from '../../../src/components/Details/Details';
import Spinner from '../../../src/components/Spinner/Spinner';
import Github from '../../../src/pages/github/[username]';

describe('Github Page', () => {
  let mock;
  let useRouterMock;
  let userDetails = {
    avatar_url:'testImg',
    html_url: '/',
    name: 'Test test',
    email: 'test@test.com',
    followers: 1,
    following: 0,
    public_repos: 4,
    owned_private_repos: 1
  }
  let repostories = [{
      id: '1',
      name: 'repo1',
      description: 'repo1',
      html_url: '/github/repo1',
      fork: false,
      private: false,
      created_at: '08/01/2020',
      updated_at: '12/01/2020'
    },{
      id: '2',
      name: 'repo2',
      description: 'repo2',
      html_url: '/github/repo2',
      fork: true,
      private: true,
      created_at: '01/03/2020',
      updated_at: '10/04/2020'
    }
  ]

  beforeAll(() => {
    useRouterMock = jest.spyOn(require('next/router'), 'useRouter')
    useRouterMock.mockImplementation(() => ({
      query: { username: 'test' },
    }))
    mock = new MockAdapter(axios);
    mock.onGet('/git/user/test').reply(200, userDetails);
    mock.onGet('/git/repository/test').reply(200, []);
  });
  afterAll(()=> {
    useRouterMock.mockRestore();
    mock.resetHistory();
  });
  it('should render header', async() => {
    let renderedComponent;
    await act(async() => {
      renderedComponent = mount(<Github />);
     });
    expect(renderedComponent.find('h1').text()).toEqual(`Welcome test, you have successfully logged in !!!`);
    expect(renderedComponent.find('h1').find('img').prop("src")).toEqual('/github.png');
    expect(renderedComponent.find('h1').find('img').prop("alt")).toEqual('github');
  });
  it('should render user details', async() => {
    let renderedComponent;
    await act(async() => {
      renderedComponent = mount(<Github />);
     });
    const master = renderedComponent.find(Master).render();
    expect(renderedComponent.contains(master)).toBeTruthy;
    expect(master.find('img').prop('src')).toEqual(userDetails.avatar_url);
    expect(master.find('img').prop('alt')).toEqual(userDetails.name);
    expect(master.find('p:nth-child(2)').text()).toEqual(`Name:${userDetails.name}`);
    expect(master.find('p:nth-child(3)').text()).toEqual(`Email:${userDetails.email}`);
    expect(master.find('p:nth-child(4)').text()).toEqual(`Number of people following you:${userDetails.followers}`);
    expect(master.find('p:nth-child(5)').text()).toEqual(`Number of people you are following:${userDetails.following}`);
    expect(master.find('p:nth-child(6)').text()).toEqual(`Total Number of repositories:${userDetails.public_repos+userDetails.owned_private_repos}`);
    expect(master.find('p:nth-child(7)').text()).toEqual(`Number of private repositories:${userDetails.owned_private_repos}`);
  });

  it('should render spinner', async() => {
    let renderedComponent;
    await act(async() => {
      renderedComponent = mount(<Github />);
    });
    const details = renderedComponent.find(Details).render();
    const spinner = renderedComponent.find(Spinner).render();
    expect(renderedComponent.contains(details)).toBeTruthy;
    expect(renderedComponent.contains(spinner)).toBeTruthy;
  });

  it('should render repositories', async () => {
    let renderedComponent; 
    mock.onGet('/git/repository/test').reply(200, repostories);
    await act(async() => {
      renderedComponent = mount(<Github />);
    });
    const details = renderedComponent.find(Details).render();
    expect(renderedComponent.contains(details)).toBeTruthy;
    expect(details.find('div').length).toEqual(2);
    //details of repository1
    const card1 = details.find('div:nth-child(1)');
    expect(card1.find('a').prop('href')).toEqual('/github/repo1');
    expect(card1.find('a').find('>p').text()).toEqual('repo1');
    const section1 = card1.find('section');
    expect(section1.find('p:nth-child(1)').text()).toEqual('repo1');
    expect(section1.find('p:nth-child(2)').text()).toEqual('Repository Type: Public');
    expect(section1.find('p:nth-child(3)').text()).toEqual('Forked: false');
    expect(section1.find('p:nth-child(4)').text()).toEqual('Created: 08/01/2020');
    expect(section1.find('p:nth-child(5)').text()).toEqual('Last Updated: 12/01/2020');
    //details of repository2
    const card2 = details.find('div:nth-child(2)');
    expect(card2.find('a').prop('href')).toEqual('/github/repo2');
    expect(card2.find('a').find('>p').text()).toEqual('repo2');
    const section2 = card2.find('section');
    expect(section2.find('p:nth-child(1)').text()).toEqual('repo2');
    expect(section2.find('p:nth-child(2)').text()).toEqual('Repository Type: Private');
    expect(section2.find('p:nth-child(3)').text()).toEqual('Forked: true');
    expect(section2.find('p:nth-child(4)').text()).toEqual('Created: 01/03/2020');
    expect(section2.find('p:nth-child(5)').text()).toEqual('Last Updated: 10/04/2020');
  });
  it('should call /git/user/test and /git/repository/test', async() => {
    const axiosSpy = jest.spyOn(axios, 'get');
    await act(async() => {
     mount(<Github />);
    });
    expect(axiosSpy).toHaveBeenCalledWith('/git/user/test');
    expect(axiosSpy).toHaveBeenCalledWith('/git/repository/test');
    expect(axiosSpy).toHaveBeenCalledTimes(2);
    axiosSpy.mockRestore();
  });
});
