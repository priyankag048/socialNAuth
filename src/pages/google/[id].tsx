import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Image from '../../components/Image/Image';
import Text from '../../components/Text/Text';

export default () => {
    const router = useRouter();
    const {id}  = router.query && router.query;
    const initiaUserState = {
        name:'',
        email: '',
        locale: '',
        picture: '',
    }
    const [ user, setUser] = useState(initiaUserState);
    useEffect(() => {
        (async () => {
            const user = id && await axios.get(`/google/user/${id}`);
            if(user && user.data){
                setUser(user.data);
            }
        })();
    },[id]);
    const { name, email, locale, picture } = user;
    const title=`Welcome ${name}, you have successfully logged in !!!`;
    const logo = '/google.png';
    const logoAlt = 'google';
    const user_profile = [
        {id: '1', title: 'Name', value: name},
        {id: '2', title: 'Email', value: email},
        {id: '3',title: 'Locale', value: locale},
    ]
    return (
        <Container>
            <Header title={title} logo={logo} logoAlt={logoAlt}/>
            <Main>
                <Image picture={picture} alt={name}/>
                <div>
                    {user_profile && user_profile.length > 0
                        && user_profile.map(({ id, title, value }) => (
                            <Text key={id} title={title} value={value} />
                        ))
                    }
                </div>
            </Main>
        </Container>
    )
};