import request from 'supertest';
import Database from '../../../src/server/db';
const database = Database.getDBInstance();
const auth = {
  requestToken: jest.fn().mockResolvedValue({data: {access_token: 'test-token'}}),
  requestAccess: jest.fn().mockResolvedValue({data: {
    name:'testuser',
    id:'test1'
  }})
}
const selectedData = [{
  name: 'testuser',
  id:'test1',
  access_token: 'test-token',
  repos_url: 'test-repo'
}];
jest.spyOn(database, 'connectToDatabase').mockResolvedValue({});
jest.spyOn(database, 'insertData').mockResolvedValue({});
jest.spyOn(database, 'selectData').mockResolvedValue(selectedData);
jest.doMock('../../../src/server/auth', () => (auth));
jest.doMock('../../../src/server/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));
import setupServer from '../../../src/server/server';

describe('Git Routes', () =>{
  let app;
  beforeEach(async () => {
    const handler = jest.fn();
    app = await setupServer(handler);
  });
  afterEach(() => {
    jest.clearAllMocks();
    app.close();
  })
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should check for callback',  async () => {
    const response = await request(app).get('/git/auth/callback')
    .query({code:'1234'});
    expect(response.status).toEqual(302);
    expect(response.redirect).toBeTruthy();
    expect(auth.requestAccess).toHaveBeenCalledTimes(1);
    expect(auth.requestToken).toHaveBeenCalledTimes(1);
    expect(database.insertData).toHaveBeenCalledTimes(2);
  });
  it('should check for user data',  async () => {
    const response = await request(app).get('/git/user/test1');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      name: 'testuser',
      id: 'test1',
      access_token: 'test-token',
      repos_url: 'test-repo'
    });
    expect(database.selectData).toHaveBeenCalledTimes(1);
  });
  it('should check for user repositories',  async () => {
    const response = await request(app).get('/git/repository/test1');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ name: 'testuser', id: 'test1', type: 'git' });
    expect(database.selectData).toHaveBeenCalledTimes(2);
    expect(auth.requestAccess).toHaveBeenCalledTimes(1);
  });
});