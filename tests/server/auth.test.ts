import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import { requestToken, requestAccess } from '../../src/server/auth';

describe('Authentication', () => {
  let mock;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  })
  it('should call axios with method POST', async() => {
    const url = '/test';
    const data = '{name: test}';
    const headers =  {'Content-Type': 'application/json'};
    mock.onPost(url).reply(200, { success: true});
    const response = await requestToken(url, data, headers);
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({success: true});
    expect(response.config.method).toEqual('post');
  });

  it('should return axios GET promise when query_params are not passed', async() => {
    const url = '/test';
    const headers =  {'Content-Type': 'application/json'};
    mock.onGet(url).reply(200, { success: true});
    const response = await requestAccess(url, headers );
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({success: true});
    expect(response.config.method).toEqual('get');
  });

  it('should return axios GET promise when query_params are passed', async() => {
    const url = '/test';
    const headers =  {'Content-Type': 'application/json'};
    const query_params = 'a=5';
    mock.onGet(`${url}?${query_params}`).reply(200, { success: true});
    const response = await requestAccess(url, headers, query_params );
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({success: true});
    expect(response.config.method).toEqual('get');
  });
});