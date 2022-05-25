import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoadingAnimation from '../../components/loadingAnimation';
import { userData } from '../../values/types';

export default function Profile({
    accessToken,
    setAccessToken,
    removeAccessToken
}: {
    accessToken: string;
    setAccessToken?: any;
    removeAccessToken?: any;
}) {
    const [user, setUser] = useState<userData>(null as any);

    useEffect(() => {
        fetch('/api/users/profile', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                if (res.ok) return res.json();
                else {
                    removeAccessToken();
                    throw new Error();
                }
            })
            .then(data => {
                data.access_token && setAccessToken(data.access_token);
                setUser(data);
            })
            .catch(e => {});
    }, [accessToken, setAccessToken, removeAccessToken]);

    if (user)
        return (
            <main>
                <h1>@{user.username}</h1>
                <b>{user.name}</b>
                <p>{user.bio}</p>
                <ul>
                    <li>
                        <NavLink end to='/recipes/new'>
                            add recipe
                        </NavLink>
                    </li>
                    <li>
                        <NavLink end to={`/recipes?only-user=${user.username}`}>
                            see your recipes
                        </NavLink>
                    </li>
                    {/* <li><NavLink end to='/skills/new'>add skill</NavLink></li>
                <li><NavLink end to='/skills'>see your skills</NavLink></li> */}
                </ul>
            </main>
        );
    else
        return (
            <main>
                <LoadingAnimation />
            </main>
        );
}

