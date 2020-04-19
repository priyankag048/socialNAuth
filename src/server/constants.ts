const getRedirectUrl = (value: string): string => `http://${process.env.HOST}:${process.env.PORT}/${value}/auth/callback`;

export const CONFIG = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    DB_URL: process.env.DB_URL,
    DB_NAME: process.env.DB_NAME,
    TOKEN_COLLECTION_NAME: process.env.DB_TOKEN_COLLECTION_NAME,
    USER_COLLECTION_NAME: process.env.DB_USER_COLLECTION_NAME,
    GIT_CLIENT_ID: process.env.GIT_CLIENT_ID,
    GIT_CLIENT_SECRET: process.env.GIT_CLIENT_SECRET,
    GIT_REDIRECT_URL: getRedirectUrl('git'),
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URL: getRedirectUrl('google'),
    FB_CLIENT_ID: process.env.FB_CLIENT_ID,
    FB_CLIENT_SECRET: process.env.FB_CLIENT_SECRET,
    FB_REDIRECT_URL: getRedirectUrl('facebook'),
}

export enum AUTH {
    GIT = 'git',
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
    RESPONSE_TYPE = 'code',
} 

export enum GIT_CREDENTIALS {
    AUTH_URL = 'https://github.com/login/oauth/authorize',
    TOKEN_URL = 'https://github.com/login/oauth/access_token',
    USER_PROFILE_URL = 'https://api.github.com/user',
    SCOPE= 'user',
    GRANT_TYPE = 'authorization_code',
}

export enum GOOGLE_CREDENTIALS {
    AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth',
    TOKEN_URL = 'https://oauth2.googleapis.com/token',
    USER_PROFILE_URL = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
    SCOPE = 'openid email profile',
    ACCESS_TYPE = 'offline',
    GRANT_TYPE = 'authorization_code',
}

export enum FACEBOOK_CREDENTIALS {
    FB_URL = 'https://graph.facebook.com/',
    SCOPE = 'email,user_birthday,user_gender,user_photos',
}
