import React, { useState } from 'react';

export default function Login(
    {accessToken, setAccessToken}: {
        accessToken: string, setAccessToken: any
    }) {
    const [username, setUsername] = useState<string>(null as any);
    const [password, setPassword] = useState<string>(null as any);
    
    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        async function fetchData() {
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username: username, password: password})
            });
            if (await res.ok) {
                let a = await res.json();
                console.log(a.access_token);
                setAccessToken(a.access_token);
            } else {
                window.alert("wrong login attempt")
            }
        }
        fetchData();
    };
    return (
        <main>
            <b>{accessToken && accessToken}</b>
            <h1>Login Form here</h1>
            <form>
                <label htmlFor="username"><b>Username</b></label>
                {"  "}
                <input
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    onChange={e => {setUsername(e.target.value)}}
                    required
                />
                <br/>
                <br/>
                <label htmlFor='password'><b>Password</b></label>
                {"  "}
                <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    onChange={e => {setPassword(e.target.value)}}
                    required
                />
                <br/>
                <br/>
                <button
                    onClick={submitForm}
                >Login</button>
            </form>
        </main>
    )
}