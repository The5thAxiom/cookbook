import userStore from '../stores/userStore';
import accessTokenStore from '../stores/accessTokenStore';
import collectionStore from '../stores/collectionsStore';
import useFetch from './useFetch';
import useMainAction from './useMainAction';

export default function useCurrentUser(): {
    fetchUser: () => void;
    logInUser: (data: userLoginData) => void;
    logOutUser: () => void;
} {
    const { setAccessToken, removeAccessToken } = accessTokenStore();
    const setUser = userStore(state => state.setUser);
    const setCollections = collectionStore(state => state.setCollections);
    const { fetchAsUser, fetchJsonAsUser } = useFetch();
    const { startMainAction, endMainAction } = useMainAction();

    const fetchUser = async () => {
        const data = await fetchJsonAsUser<userData>('/api/users/profile');
        setUser(data);
    };

    const logInUser = async (data: userLoginData) => {
        startMainAction();
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
        endMainAction();
    };

    const logOutUser = () => {
        startMainAction();
        fetchAsUser('/api/users/logout');
        removeAccessToken();
        setUser(null as any);
        setCollections(null as any);
        endMainAction();
    };

    return { fetchUser, logInUser, logOutUser };
}

