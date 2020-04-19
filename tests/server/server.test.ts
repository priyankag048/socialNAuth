import express from 'express';
import '../../src/server/logger';
import Database from '../../src/server/db';
const database = Database.getDBInstance();
const app = {
  use: jest.fn(),
  get: jest.fn(),
  listen: jest.fn()
}
jest.doMock('express', () => {
  return () => app;
});
jest.doMock('../../src/server/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));
jest.doMock('../../src/server/routes/git.routes', () => jest.fn());
jest.doMock('../../src/server/routes/google.routes', () => jest.fn());
jest.doMock('../../src/server/routes/facebook.routes', () => jest.fn());
jest.spyOn(database, 'connectToDatabase').mockImplementation(() => Promise.resolve());

import setupServer from '../../src/server/server';

describe('SetupServer', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should set up express server', async() => {
    const handler = jest.fn();
    await setupServer(handler);
    expect(app.use).toHaveBeenCalledTimes(3);
    expect(app.get).toHaveBeenCalledTimes(1);
    expect(app.listen).toHaveBeenCalledTimes(1);
  }); 
});