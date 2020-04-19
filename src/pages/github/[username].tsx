import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import Master from '../../components/Master/Master';
import Details from '../../components/Details/Details';
import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner/Spinner';
import Image from '../../components/Image/Image';
import Text from '../../components/Text/Text';


export default () => {
    const router = useRouter();
    const {username}  = router.query;
    const initiaUserState = {
        avatar_url:'',
        html_url: '',
        name: '',
        email: '',
        followers: 0,
        following: 0,
        public_repos: 0,
        owned_private_repos: 0
    }
    const [ user, setUser] = useState(initiaUserState);
    const [repositories, setRepositories] = useState([]);
    useEffect(() => {
        (async () => {
            const userDetails = username && await axios.get(`/git/user/${username}`);
            if(userDetails && userDetails.data){
                setUser(userDetails.data);
            }
        })();
    },[username]);
    useEffect(() => {
        (async () => {
            const repositories = user && await axios.get(`/git/repository/${username}`);
            if(repositories && repositories.data){
                setRepositories(repositories.data);
            }
        })();
    },[username]);
    const { avatar_url, html_url: url, name, email, followers,following, public_repos, owned_private_repos} = user;
    const title=`Welcome ${username}, you have successfully logged in !!!`;
    const logo = '/github.png';
    const logoAlt = 'github';
    const profileText = 'View your profile in Github'
    const user_profile = [
        {id: '1', title: 'Name', value: name},
        {id: '2', title: 'Email', value: email},
        {id: '3',title: 'Number of people following you', value: followers},
        {id: '4',title: 'Number of people you are following', value: following},
        {id: '5',title: 'Total Number of repositories', value: public_repos+owned_private_repos},
        {id: '6',title: 'Number of private repositories', value: owned_private_repos},
    ]
    return (
        <Container>
            <Header title={title} logo={logo} logoAlt={logoAlt}/>
            <Master>
                <Image picture={avatar_url} alt={name} url={url} text={profileText}/>
                {user_profile && user_profile.length > 0
                    && user_profile.map(({ id, title, value }) => (
                        <Text key={id} title={title} value={value} />
                    ))
                }
            </Master>
            <Details>
                {repositories && repositories.length > 0 ? (
                    repositories.map(({id: repo_id, name: repo_name, description, html_url, fork, private: private_repo, created_at, updated_at}) => (
                        <Card key={repo_id} name={repo_name} url={html_url}>
                            <p>{description}</p>
                            <p>Repository Type: {private_repo ? 'Private' : 'Public'}</p>
                            <p>Forked: {fork ? 'true' : 'false'}</p>
                            <p>Created: {created_at}</p>
                            <p>Last Updated: {updated_at}</p>
                        </Card>
                    ))
                ) : (<Spinner />)
                }
            </Details>
        </Container>
    )
};