import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { userLoginData } from '../../values/types';

export default function Login({
    accessToken,
    setAccessToken
}: {
    accessToken: string;
    setAccessToken: any;
}) {
    const [userData, setUserData] = useState<userLoginData>(null as any);

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        async function fetchData() {
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (res.ok) {
                let a = await res.json();
                setAccessToken(a.access_token);
            } else {
                window.alert('wrong login attempt');
            }
        }
        fetchData();
    };
    return (
        <main>
            <b>{accessToken && accessToken}</b>
            <h1>Login</h1>
            <form>
                <label htmlFor='username'>
                    <b>Username</b>
                </label>
                {'  '}
                <input
                    type='text'
                    placeholder='Enter your username'
                    name='username'
                    onChange={e => {
                        setUserData({ ...userData, username: e.target.value });
                    }}
                    required
                />
                <br />
                <br />
                <label htmlFor='password'>
                    <b>Password</b>
                </label>
                {'  '}
                <input
                    type='password'
                    placeholder='Enter your password'
                    name='password'
                    onChange={e => {
                        setUserData({ ...userData, password: e.target.value });
                    }}
                    required
                />
                <br />
                <br />
                <button onClick={submitForm}>Login</button>
            </form>
            <br />
            Don't have an account?{' '}
            <NavLink end to='/user/new'>
                Signup
            </NavLink>{' '}
            here today!
        </main>
    );
}

