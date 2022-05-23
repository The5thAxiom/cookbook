import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingAnimation from '../components/loadingAnimation';
import '../index.css';
import { userData } from '../values/types';

export default function User() {
    const [user, setUser] = useState<userData>(null as any);
    const params = useParams();

    useEffect(() => {
        setUser(null as any);
        fetch(`/api/users/${params.username}`)
            .then(res => res.json())
            .then((data: userData) => setUser(data));
    }, [params.username])

    if (user)
    return (
        <main>
            <h1>@{user.username}</h1>
            <b>{user.name}</b>
            <p>{user.bio}</p>
        </main>
    );
    else return <main><LoadingAnimation/></main>
}
