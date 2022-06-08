import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import LoadingAnimation from '../../components/loadingAnimation';

export default function User() {
    const [user, setUser] = useState<userData>(null as any);
    const params = useParams();

    useEffect(() => {
        setUser(null as any);
        fetch(`/api/users/${params.username}`)
            .then(res => res.json())
            .then((data: userData) => setUser(data));
    }, [params.username]);

    if (user)
        return (
            <main>
                <h1>@{user.username}</h1>
                <b>{user.name}</b>
                <p>{user.bio}</p>
                <p>
                    Checkout their recipes{' '}
                    <NavLink end to={`/recipes?only-user=${user.username}`}>
                        here
                    </NavLink>
                </p>
            </main>
        );
    else
        return (
            <main>
                <LoadingAnimation />
            </main>
        );
}

