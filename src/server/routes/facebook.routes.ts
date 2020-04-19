import express, { Request, Response } from 'express';
import { stringify } from "querystring";
import { requestAccess } from '../auth';
import { FACEBOOK_CREDENTIALS, CONFIG, AUTH } from '../constants';
import Database from '../db';
import logger from '../logger';
import Headers from '../interface/Headers';
const { TOKEN_COLLECTION_NAME,
        USER_COLLECTION_NAME,
        FB_CLIENT_ID,
        FB_CLIENT_SECRET,
        FB_REDIRECT_URL
     } = CONFIG;
const { FACEBOOK } = AUTH;
const router = express.Router();

const database = Database.getDBInstance();

router.get('/auth/callback', async (req: Request, res: Response)=> {
    try{
        const { code } = req.query as {code: string}  ;
        const { FB_URL } = FACEBOOK_CREDENTIALS;
        const tokenParams = stringify({
            code,
            client_id: FB_CLIENT_ID,
            client_secret: FB_CLIENT_SECRET,
            redirect_uri: FB_REDIRECT_URL
        })
        const tokenUrl = `${FB_URL}oauth/access_token`;
        const token_headers: Headers = {
            'Content-Type': 'application/json'
        }
        const { data:{ access_token } } = await requestAccess(tokenUrl, token_headers, tokenParams);
        await database.insertData(TOKEN_COLLECTION_NAME, { $set: { type:'facebook', access_token}}, {type: 'facebook'});
        const profileParams = 'fields=name,email,birthday,posts,gender,picture';
        const profileUrl = `${FB_URL}me`;
        const  profileHeaders: Headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
        const { data: { name, email, birthday, gender, id } } = await requestAccess(profileUrl, profileHeaders, profileParams);
        const user = { name, email, birthday, gender, id, type: FACEBOOK };
        await database.insertData(USER_COLLECTION_NAME, { $set: user}, { id, type: FACEBOOK });
        res.redirect(`/facebook/${id}`);
    }catch(err){
        logger.error(`Error: ${err}`);
    }
});

router.get('/user/:id', async (req: Request, res: Response) => {
    try{
        let user = {
            id: '',
            name: '',
            email: '',
            birthday: '',
            gender: ''
        };
        const { id } = req.params;
        const response = await database.selectData(USER_COLLECTION_NAME,{id, type: FACEBOOK});
        user = response && response.length > 0 && response[0];
        const {id: userId, name, email, birthday, gender } = user;
        res.status(200).json({
            id: userId,
            name,
            email,
            birthday,
            gender,
        });
    }catch(err){
        logger.error(`Error: ${err}`);
    }
});

export default router;