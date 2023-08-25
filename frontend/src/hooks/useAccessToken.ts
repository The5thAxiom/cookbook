import { useEffect, useState } from 'react';

export default function useAccessToken() {
    const [token, setToken] = useState(localStorage.getItem('access_token'));
    const setAccessToken = (accessToken: string) =>
        localStorage.setItem('access_token', accessToken);
    useEffect(() => {
        window.addEventListener('storage', () => {});
    });
}
