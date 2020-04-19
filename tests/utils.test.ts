jest.doMock('../src/server/constants', () => ({
  CONFIG: {
    GIT_CLIENT_ID: 'gitClient',
    GIT_REDIRECT_URL: '/git/callback',
    GOOGLE_CLIENT_ID: 'googleClient',
    GOOGLE_REDIRECT_URL: '/google/callback',
    FB_CLIENT_ID: 'fbClient',
    FB_REDIRECT_URL: '/fb/callback'
  },
  AUTH: {
    GIT: 'git',
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    RESPONSE_TYPE: 'testCode'
  },
  GIT_CREDENTIALS: {
    AUTH_URL: 'github/oauth/authorize',
    SCOPE: 'user',
  },
  GOOGLE_CREDENTIALS: {
    AUTH_URL: 'google/oauth/authorize',
    SCOPE: 'openid',
    ACCESS_TYPE: 'offline',
  },
  FACEBOOK_CREDENTIALS: {
    FB_URL: 'facebook/',
    SCOPE: 'email'
  }
}));
import { calculateAge, getAuthorizationUrl } from '../src/utils';

describe('calculateAge function', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should calculate the correct age if current month is more than month of birth', () => {
    const age = calculateAge('01/01/2000');
    expect(age).toEqual(20);
  });
  it('should calculate the correct age if current month is less than month of birth', () => {
    const age = calculateAge('05/01/2000');
    expect(age).toEqual(19);
  });
});

describe('getAuthorizationUrl function', () => {
  it('should return correct authorization url for git', () => {
    const auth_url = (getAuthorizationUrl('git'));
    const expected = `github/oauth/authorize?response_type=testCode&client_id=gitClient&scope=user&redirect_uri=/git/callback`;
    expect(decodeURIComponent(auth_url)).toEqual(expected);
  });
  it('should return correct authorization url for google', () => {
    const auth_url = getAuthorizationUrl('google');
    const expected = 'google/oauth/authorize?response_type=testCode&client_id=googleClient&scope=openid&redirect_uri=/google/callback&access_type=offline&include_granted_scopes=true';
    expect(decodeURIComponent(auth_url)).toEqual(expected);
  });
  it('should return correct authorization url for facebook', () => {
    const auth_url = getAuthorizationUrl('facebook');
    const expected = 'facebook/oauth/authorize?response_type=testCode&client_id=fbClient&scope=email&redirect_uri=/fb/callback'
    expect(decodeURIComponent(auth_url)).toEqual(expected);
  });
});