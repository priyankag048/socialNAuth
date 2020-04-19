import request from 'supertest';
import Database from '../../../src/server/db';
const database = Database.getDBInstance();
const auth = {
  requestToken: jest.fn().mockResolvedValue({data: {access_token: 'test-token'}}),
  requestAccess: jest.fn().mockResolvedValue({data: {name:'testuser', id:'test1'}})
}
jest.spyOn(database, 'connectToDatabase').mockResolvedValue({});
jest.spyOn(database, 'insertData').mockResolvedValue({});
jest.spyOn(database, 'selectData').mockResolvedValue([{name: 'testuser', id:'test1'}]);
jest.doMock('../../../src/server/auth', () => (auth));
jest.doMock('../../../src/server/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));
import setupServer from '../../../src/server/server';

describe('Google Routes', () =>{
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
    const response = await request(app).get('/facebook/auth/callback')
    .query({code:'1234'});
    expect(response.status).toEqual(302);
    expect(response.redirect).toBeTruthy();
    expect(auth.requestAccess).toHaveBeenCalledTimes(2);
    expect(database.insertData).toHaveBeenCalledTimes(2);
  });
  it('should check for user data',  async () => {
    const response = await request(app).get('/facebook/user/test1');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ name: 'testuser', id: 'test1' });
    expect(database.selectData).toHaveBeenCalledTimes(1);
  });
  
});
