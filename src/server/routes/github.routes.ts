import express, { Request, Response } from 'express';
import { requestToken, requestAccess } from '../auth';
import Database from '../db';
import { GIT_CREDENTIALS, CONFIG, AUTH } from '../constants';
import logger from '../logger';
import Headers from '../interface/Headers';
import Credentials from '../interface/Credential';
const { 
        TOKEN_COLLECTION_NAME,
        USER_COLLECTION_NAME,
        GIT_CLIENT_ID,
        GIT_CLIENT_SECRET,
        GIT_REDIRECT_URL
    } = CONFIG;
const { GIT } = AUTH;
const router = express.Router();
const database = Database.getDBInstance();

router.get('/auth/callback', async (req: Request, res: Response) => {
    try{
        const { code } = req.query as {code: string};
        const { TOKEN_URL, GRANT_TYPE, USER_PROFILE_URL } = GIT_CREDENTIALS;
        const credentials: Credentials = {
            code,
            grant_type: GRANT_TYPE,
            client_id: GIT_CLIENT_ID,
            client_secret: GIT_CLIENT_SECRET,
            redirect_url: GIT_REDIRECT_URL,
        }
        const token_headers: Headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        const { data: { access_token } } =  await requestToken(TOKEN_URL, credentials, token_headers);
        await database.insertData(TOKEN_COLLECTION_NAME, { $set: { type: GIT, access_token}}, {type: GIT});
        const profile_headers: Headers = {
            'Authorization': `bearer ${access_token}`
        }
        const { data: user} = await requestAccess(USER_PROFILE_URL, profile_headers);
        user.type = GIT;
        const { login } = user;
        await database.insertData(USER_COLLECTION_NAME, { $set: user}, {login, type: GIT});
        res.redirect(`/git/${login}`);
    }catch(err){
        logger.error('Error', err);
    }
    
});

router.get('/user/:username', async (req:Request, res:Response) => {
    try{    
        let user = {};
        const { username } = req.params;
        const response = await database.selectData(USER_COLLECTION_NAME,{ login: username, type: GIT });
        user = response && response.length > 0 && response[0];
        res.status(200).json(user);
    } catch(err){
        logger.error('Error', err);
    }
});

router.get('/repository/:username', async (req:Request, res:Response) => {
    try{
        const { username } = req.params;
        const token = await database.selectData(TOKEN_COLLECTION_NAME,{type: GIT});
        const {access_token} = token && token.length > 0 && token[0];
        const userDetails =  await database.selectData(USER_COLLECTION_NAME,{ login: username, type: GIT });
        const { repos_url } = userDetails && userDetails.length > 0 && userDetails[0];
        const profile_headers: Headers = {
            'Authorization': `bearer ${access_token}`
        }
        const response = access_token && repos_url && await requestAccess(repos_url, profile_headers);
        const respositories = response && response.data;
        res.status(200).json(respositories);
    } catch(err){
        logger.error('Error', err);
    }
});

export default router;