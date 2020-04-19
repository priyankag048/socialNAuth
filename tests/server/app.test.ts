const setupServer = jest.fn();
jest.doMock('../../src/server/server', () => setupServer);
const nextApp = {
  getRequestHandler: jest.fn(),
  prepare: jest.fn().mockResolvedValue({})
}
jest.doMock('next', () => () => nextApp);
import '../../src/server/app';

describe('App', () => {
  it('should call prepare and should set up server', () => {
    expect(nextApp.prepare).toHaveBeenCalledTimes(1);
    expect(setupServer).toHaveBeenCalledTimes(1);
  });
});