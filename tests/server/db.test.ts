import '../../src/server/constants';
import '../../src/server/logger';
const config = {
  DB_URL: process.env.DB_URL,
  DB_NAME: 'auth-test'
};
jest.doMock('../../src/server/constants', () => ({
  CONFIG: config
}));
const logger = {
  info: jest.fn(),
  error: jest.fn()
}
jest.doMock('../../src/server/logger', () => logger);
const COLLECTION_NAME = 'test';
import Database from '../../src/server/db';
let database;
describe('Database Queries', () => {
  beforeAll(() => {
    database = Database.getDBInstance();
  });

  afterAll(async () => {
    jest.restoreAllMocks();
    await database.connection.close();
  });

  it('should establish database connection', async () => {
    await database.connectToDatabase();
    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith('Connected successfully to auth-test database');
    const dbname = database.db.databaseName;
    expect(dbname).toEqual('auth-test');
    
  });

  it('should insert data', async () => {
    const data = {$set:{id: 1, name: 'test', email: 'test@test.com'}};
    const query = {id: 1};
    await database.insertData(COLLECTION_NAME, data, query);
    const [result] = await database.db.collection(COLLECTION_NAME).find({}).toArray();
    expect(result.id).toEqual(1);
    expect(result.name).toEqual('test');
    expect(result.email).toEqual('test@test.com');
  });

  it('should select data', async () => {
    const [result] = await database.selectData(COLLECTION_NAME, {id: 1});
    expect(result.id).toEqual(1);
    expect(result.name).toEqual('test');
    expect(result.email).toEqual('test@test.com');
  });
});