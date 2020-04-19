import axios from 'axios';
import Credentials from './interface/Credential';
import Headers from './interface/Headers';

export const requestToken = (url: string, data:Credentials| string, headers:Headers ) => 
    axios({
        method: 'POST',
        url,
        data,
        headers
    });

export const requestAccess = (url: string, headers:Headers , query_params?: string) => {
    url = query_params ? `${url}?${query_params}` : url;
    return  axios({
        method: 'GET',
        url,
        headers
    });
}
   