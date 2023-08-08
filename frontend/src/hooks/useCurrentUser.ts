import accessTokenStore from '../stores/accessTokenStore';
import useFetch from './useFetch';
import useMainAction from './useMainAction';
import create from 'zustand';

const userStore = create<{
    user: userData;
    setUser: (user: userData) => void;
}>(set => ({
    user: null as any,
    setUser: (user: userData) => set({ user })
}));

export default function useCurrentUser(): {
    user: userData;
    fetchUser: () => void;
    logInUser: (data: userLoginData) => void;
    logOutUser: () => void;
} {
    const { setAccessToken, removeAccessToken } = accessTokenStore();
    const { user, setUser } = userStore();
    const { fetchAsUser, fetchJsonAsUser } = useFetch();
    const { startMainAction, endMainAction } = useMainAction();

    const apiUrl = 'http://localhost:5000';

    const fetchUser = async () => {
        const data = await fetchJsonAsUser<userData>('/api/users/profile');
        // console.log('fetched user');
        setUser(data);
    };

    const logInUser = async (data: userLoginData) => {
        startMainAction();
        const res = await fetch(apiUrl + '/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            const data = await res.json();
            setAccessToken(data.access_token);
        } else {
            window.alert('wrong login attempt');
        }
        endMainAction();
    };

    const logOutUser = () => {
        startMainAction();
        fetchAsUser('/api/users/logout');
        removeAccessToken();
        setUser(null as any);
        endMainAction();
    };

    return { user, fetchUser, logInUser, logOutUser };
}

