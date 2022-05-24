import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoadingAnimation from '../components/loadingAnimation';
import { accessTokenData, userData } from '../values/types';

export default function Profile({accessToken}: {accessToken: string}) {

    const [user, setUser] = useState<userData>(null as any);

    useEffect(() => {
        fetch('/api/users/profile', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(res => res.json()).then(data => setUser(data));
    }, [])
    

    if (user)
    return (
        <main>
            <h1>@{user.username}</h1>
            <b>{user.name}</b>
            <p>{user.bio}</p>
            <ol>
                <li><NavLink to='/recipes/new'>add recipe</NavLink></li>
                <li><NavLink to='/skills/new'>add skill</NavLink></li>
                <li><NavLink to='/recipes'>see your recipes</NavLink></li>
                <li><NavLink to='/skills'>see your skills</NavLink></li>
            </ol>
        </main>
    );
    else return <main><LoadingAnimation/></main>
}