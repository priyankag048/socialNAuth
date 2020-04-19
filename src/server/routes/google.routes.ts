import express, { Request, Response } from 'express';
import { stringify } from "querystring";
import { requestToken, requestAccess } from '../auth';
import { GOOGLE_CREDENTIALS, CONFIG, AUTH } from '../constants';
import Database from '../db';
import logger from '../logger';
import Headers from '../interface/Headers';
const {
        TOKEN_COLLECTION_NAME,
        USER_COLLECTION_NAME,
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_REDIRECT_URL
    } = CONFIG;
const { GOOGLE } = AUTH;
const router = express.Router();

const database = Database.getDBInstance();
router.get('/auth/callback', async (req: Request, res: Response)=> {
    try{
        const { code } = req.query as {code: string};
        const { GRANT_TYPE, TOKEN_URL, USER_PROFILE_URL } = GOOGLE_CREDENTIALS;
        const params = {
            code,
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            redirect_uri: GOOGLE_REDIRECT_URL,
            grant_type: GRANT_TYPE
        }
        const tokenParams = stringify(params);
        const token_headers: Headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
        const response = await requestToken(TOKEN_URL, tokenParams, token_headers);
        const { data: { access_token } } = response;
        await database.insertData(TOKEN_COLLECTION_NAME, { $set: { type: GOOGLE, access_token}}, {type: GOOGLE});
        const profileHeaders = { 'Authorization': `Bearer ${access_token}` };
        const { data } = await requestAccess(USER_PROFILE_URL, profileHeaders);
        const user = {...data, type: GOOGLE };
        await database.insertData(USER_COLLECTION_NAME, { $set: user}, {id: user.id, type: GOOGLE});
        res.redirect(`/google/${user.id}`);
    }catch(err){
        logger.error('Error', err);
    }
});

router.get('/user/:id', async(req: Request, res: Response) => {
    try{
        let user;
        const { id } = req.params;
        const response = await database.selectData(USER_COLLECTION_NAME,{id, type: GOOGLE});
        user = response && response.length > 0 && response[0];
        res.status(200).json(user);
    }catch(err){
        logger.error('Error', err);
    }
});

export default router;