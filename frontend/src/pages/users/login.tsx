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
            <form className='cb-form'>
                <div className='cb-form-field'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        placeholder='Enter your username'
                        name='username'
                        onChange={e => {
                            setUserData({
                                ...userData,
                                username: e.target.value
                            });
                        }}
                        required
                    />
                </div>
                <div className='cb-form-field'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        placeholder='Enter your password'
                        name='password'
                        onChange={e => {
                            setUserData({
                                ...userData,
                                password: e.target.value
                            });
                        }}
                        required
                    />
                </div>
                <div className='cb-form-end'>
                    <button className='cb-form-button' onClick={submitForm}>
                        Login
                    </button>
                    <NavLink end to='/user/new'>
                        I'm a new user
                    </NavLink>
                </div>
            </form>
        </main>
    );
}

