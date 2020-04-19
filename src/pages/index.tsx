import React from 'react';
import Container from '../components/Container/Container';
import Header from '../components/Header/Header';
import Button from '../components/Button/Button';
import Main from '../components/Main/Main';
import { getAuthorizationUrl } from '../utils';
const HomePage = () => {
    const title='Welcome to Social Network Authorization';
    const buttons = [{
        id: `git-${Date.now()}`,
        type: 'git',
        logo: '/github.png',
        logoAlt: 'github',
        text: 'Login With Github'
    },{
        id: `google-${Date.now()}`,
        type: 'google',
        logo: '/google.png',
        logoAlt: 'google',
        text: 'Login With Google'
    },{
        id: `facebook-${Date.now()}`,
        type: 'facebook',
        logo: '/facebook.png',
        logoAlt: 'facebook',
        text: 'Login With Facebook'
    }];
    const logo= '/logo.png';
    const logoAlt = 'SNH';
    return (
        <Container>
            <Header title={title} logo={logo} logoAlt={logoAlt}/>
            <Main type="column">
                {buttons.map(({ id, type, logo, logoAlt, text })=> (
                    <Button 
                        key={id}
                        url={type && getAuthorizationUrl(type)}
                        logo={logo}
                        logoAlt={logoAlt}
                        text={text}/>
                ))}
            </Main>
        </Container>
)};

export default HomePage;