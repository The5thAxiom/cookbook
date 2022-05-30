import React, { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';

export default function Signup() {
    const [username, setUsername] = useState<string>(null as any);
    const [password, setPassword] = useState<string>(null as any);
    const [name, setName] = useState<string>(null as any);
    const [bio, setBio] = useState<string>(null as any);

    const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            username: username,
            password: password,
            name: name,
            bio: bio
        });
        async function sendData() {
            fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    name: name,
                    bio: bio
                })
            }).then(res => {
                if (res.ok) {
                    setRedirectToLogin(true);
                } else {
                    window.alert('try changing your username');
                }
            });
        }
        sendData();
    };
    if (!redirectToLogin)
        return (
            <main>
                <h1>Welcome to Samy's Cookbook!</h1>
                <form className='cb-form'>
                    <div className='cb-form-field'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            placeholder='Enter your name'
                            name='name'
                            onChange={e => {
                                setName(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className='cb-form-field'>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            placeholder='Enter your username'
                            name='username'
                            onChange={e => {
                                setUsername(e.target.value);
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
                                setPassword(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className='cb-form-field'>
                        <label htmlFor='bio'>Bio</label>
                        <textarea
                            name='bio'
                            placeholder='Write a little bit about yourself!'
                            onChange={e => {
                                setBio(e.target.value);
                            }}
                        />
                    </div>
                    <div className='cb-form-end'>
                        <button className='cb-form-button' onClick={submitForm}>
                            Signup
                        </button>
                        <NavLink end to='/user'>
                            I already have an account
                        </NavLink>
                    </div>
                </form>
            </main>
        );
    else return <Navigate to='/user' />;
}

