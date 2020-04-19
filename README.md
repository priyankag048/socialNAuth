SocialNAuth
---
Authentication with social networking websites

Overview
----

socialNAuth is a simple application which supports authentication using social networking websites like
- Google
- Github
- Facebook

This application uses OAuth 2.0 (https://oauth.net/2/) to authenticate an user and fetch user details from the websites.


Prerequisite
----
Generate client ID and client secret pair.

The following are the instructions to generate clientID and client secret pair for:

- Google

    Please follow the instructions given in the link below :

     https://developers.google.com/adwords/api/docs/guides/authentication


- Facebook
    1. Go to https://developers.facebook.com/
    2. Click  `My Apps`  dropdown on top right of the page
    3. Click `create App`
    4. Fill in app information
    5. Go to https://developers.facebook.com/apps/
    6. Select the app we have created
    7. Copy App ID(clientID) and App Secret(clientSecret) from Settings > Basic

    For more information please refer to https://developers.facebook.com/docs/apps/


- Github
    1. Go to https://github.com/settings/developers
    2. Go to `OAuth Apps`
    3. Click `New OAuth App`
    4. Fill in the necessary details and click `Register application`
    5. After successful registration we will be able to get client ID and client Secret



Local Setup
----
1.  Install Node.js (https://nodejs.org/en/) >= 13.x.x

2. Install yarn globally 

    ```
        npm i -g yarn
    ```

3.  Install mongoDB and start mongoDB server ( https://www.mongodb.com/)

4.  Set up Environment Variables 

    - <b>server</b>

        Go to [setupEnv](/bin/setupEnv) and enter all environment variables.

        Execute the following command:
        ```
            source ./bin/setupEnv 
        ```

    - <b>next.js</b>

        Go to [next-env.js](./next-env.js) and enter all environment variables. These environment variables are configured in `next.config.js`

    These will set up your environment variables and we can access them using `process.env.*`

6.  Execute `yarn` to install all dependencies

Now we are all set to run the application. Execute `yarn start` to start the application.
