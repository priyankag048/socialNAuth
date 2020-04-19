import { stringify } from 'querystring';
import { GIT_CREDENTIALS, GOOGLE_CREDENTIALS, FACEBOOK_CREDENTIALS, CONFIG, AUTH } from "./server/constants";
const {
    GIT_CLIENT_ID,
    GIT_REDIRECT_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_REDIRECT_URL,
    FB_CLIENT_ID,
    FB_REDIRECT_URL,
} = CONFIG;
const { GIT, GOOGLE, FACEBOOK, RESPONSE_TYPE } = AUTH;
export const getAuthorizationUrl = (type: string): string => {
    let url_query;
    let authorizationUrl;
    switch(type) {
        case GIT:
            url_query = { 
                response_type: RESPONSE_TYPE,
                client_id: GIT_CLIENT_ID, 
                scope: GIT_CREDENTIALS.SCOPE,
                redirect_uri: GIT_REDIRECT_URL
            };
            authorizationUrl = GIT_CREDENTIALS.AUTH_URL;
            break;
        case GOOGLE:
            url_query = { 
                response_type: RESPONSE_TYPE,
                client_id: GOOGLE_CLIENT_ID, 
                scope: GOOGLE_CREDENTIALS.SCOPE,
                redirect_uri: GOOGLE_REDIRECT_URL,
                access_type: GOOGLE_CREDENTIALS.ACCESS_TYPE,
                include_granted_scopes: true,
            };
            authorizationUrl = GOOGLE_CREDENTIALS.AUTH_URL;
            break;
        case FACEBOOK:
            url_query = { 
                response_type: RESPONSE_TYPE,
                client_id: FB_CLIENT_ID, 
                scope: FACEBOOK_CREDENTIALS.SCOPE,
                redirect_uri: FB_REDIRECT_URL,
            };
            authorizationUrl = `${FACEBOOK_CREDENTIALS.FB_URL}oauth/authorize`;
            break;
    }
    const queryParams = stringify(url_query);
    return `${authorizationUrl}?${queryParams}`;
}


export const calculateAge = (birthday: string) => {
    const dob = new Date(birthday);
    const current_Date = new Date();
    const year_diff = current_Date.getFullYear() - dob.getFullYear();
    const isMonthLessInCurrent = current_Date.getMonth() <= dob.getMonth();
    return isMonthLessInCurrent ? (year_diff-1) : year_diff;
}