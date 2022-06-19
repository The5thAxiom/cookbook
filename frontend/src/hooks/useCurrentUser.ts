import userStore from '../stores/userStore';
import accessTokenStore from '../stores/accessTokenStore';
import collectionStore from '../stores/collectionsStore';
import useFetch from './useFetch';

export default function useCurrentUser(): {
    fetchUser: () => void;
    logInUser: (data: userLoginData) => void;
    logOutUser: () => void;
} {
    const { setAccessToken, removeAccessToken } = accessTokenStore();
    const setUser = userStore(state => state.setUser);
    const setCollections = collectionStore(state => state.setCollections);
    const { fetchAsUser, fetchJsonAsUser } = useFetch();

    const fetchUser = async () => {
        const data = await fetchJsonAsUser<userData>('/api/users/profile');
        setUser(data);
    };

    const logInUser = async (data: userLoginData) => {
        const res = await fetch('/api/users/login', {
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
    };

    const logOutUser = () => {
        fetchAsUser('/api/users/logout');
        removeAccessToken();
        setUser(null as any);
        setCollections(null as any);
    };

    return { fetchUser, logInUser, logOutUser };
}

