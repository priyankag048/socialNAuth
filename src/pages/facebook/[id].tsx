import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FACEBOOK_CREDENTIALS } from '../../server/constants';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Image from '../../components/Image/Image';
import Text from '../../components/Text/Text';
import { calculateAge } from '../../utils';


export default () => {
    const { FB_URL } = FACEBOOK_CREDENTIALS;
    const router = useRouter();
    const {id}  = router.query;
    const initiaUserState = {
        name:'',
        email: '',
        birthday: '',
        gender: '',
        avatar_url: '',
    }
    const [ user, setUser] = useState(initiaUserState);
    useEffect(() => {
        (async () => {
            const user = id && await axios.get(`/facebook/user/${id}`);
            if(user && user.data){
                setUser(user.data);
            }
            
        })();
    },[id]);
    const { name, email, birthday, gender } = user;
    const avatar_url = id && `${FB_URL}${id}/picture?height=200&width=200`;
    const title=`Welcome ${name}, you have successfully logged in !!!`;
    const logo = '/facebook.png';
    const logoAlt = 'facebook';
    const user_profile = [
        {id: '1', title: 'Name', value: name},
        {id: '2', title: 'Email', value: email},
        {id: '3',title: 'Gender', value: gender},
        {id: '4',title: 'Age', value: calculateAge(birthday)},
    ]
    return(
        <Container>
            <Header title={title} logo={logo} logoAlt={logoAlt}/>
            <Main>
                <Image picture={avatar_url} alt={name}/>
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
