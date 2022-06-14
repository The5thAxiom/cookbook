import { useState, useEffect } from 'react';
import useAccessToken from './useAccessToken';

import create from 'zustand';

export default function useCurrentUser(): {
    user: userData;
    fetchAsUser: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
    logInUser: (data: userLoginData) => void;
    logOutUser: () => void;
} {
    const { accessToken, setAccessToken, removeAccessToken } = useAccessToken();

    // const useStore = create<{
    //     user: userData;
    //     setUser: (user: userData) => void;
    // }>(set => ({
    //     user: null as any,
    //     setUser: (user: userData) => set({ user: user })
    // }));

    // const { user, setUser } = useStore();

    const [user, setUser] = useState<userData>(null as any);

    useEffect(() => {
        if (accessToken !== '') fetchUser();
    }, [accessToken]);

    const fetchAsUser = (
        input: RequestInfo,
        init?: RequestInit
    ): Promise<Response> => {
        return fetch(input, {
            ...init,
            headers: {
                ...init?.headers,
                Authorization: `Bearer ${accessToken}`
            }
        });
    };

    const logInUser = (data: userLoginData) => {
        fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    window.alert('wrong login attempt');
                    throw new Error();
                }
            })
            .then(data => setAccessToken(data.access_token));
    };

    const logOutUser = () => {
        setUser(null as any);
        fetchAsUser('/api/users/logout').then(res => {
            removeAccessToken();
        });
    };

    const fetchUser = () => {
        fetchAsUser('/api/users/profile')
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
                console.log('fetched user');
            })
            .catch(e => {});
    };
    return { user, fetchAsUser, logInUser, logOutUser };
}

