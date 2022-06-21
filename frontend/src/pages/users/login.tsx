import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useCurrentUser from '../../hooks/useCurrentUser';

export default function Login() {
    const [userData, setUserData] = useState<userLoginData>(null as any);
    const { logInUser } = useCurrentUser();

    return (
        <main>
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
                    <button
                        className='cb-form-button'
                        onClick={e => {
                            e.preventDefault();
                            logInUser(userData);
                        }}
                    >
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

