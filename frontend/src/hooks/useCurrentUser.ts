import userStore from '../stores/userStore';
import accessTokenStore from '../stores/accessTokenStore';
import collectionStore from '../stores/collectionsStore';

export default function useCurrentUser(): {
    fetchUser: () => void;
    fetchAsUser: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
    fetchJsonAsUser: <T>(input: RequestInfo, init?: RequestInit) => Promise<T>;
    logInUser: (data: userLoginData) => void;
    logOutUser: () => void;
} {
    const { accessToken, setAccessToken, removeAccessToken } =
        accessTokenStore();
    const setUser = userStore(state => state.setUser);
    const setCollections = collectionStore(state => state.setCollections);

    const fetchAsUser = async (
        input: RequestInfo,
        init?: RequestInit
    ): Promise<Response> => {
        const res = await fetch(input, {
            ...init,
            headers: {
                ...init?.headers,
                Authorization: `Bearer ${accessToken}`
            }
        });
        return res;
    };

    const fetchJsonAsUser = async <T>(
        input: RequestInfo,
        init?: RequestInit
    ): Promise<T> => {
        const res = await fetch(input, {
            ...init,
            headers: {
                ...init?.headers,
                Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await res.json();
        let ans = data;
        const token = data.access_token;
        if (token) {
            setAccessToken(token);
            delete ans['access_token'];
        }
        return ans as T;
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

    const fetchUser = async () => {
        const res = await fetchAsUser('/api/users/profile');
        if (res.ok) {
            const data = await res.json();
            data.access_token && setAccessToken(data.access_token);
            setUser(data);
        } else {
            removeAccessToken();
        }
    };
    return { fetchUser, fetchAsUser, fetchJsonAsUser, logInUser, logOutUser };
}

