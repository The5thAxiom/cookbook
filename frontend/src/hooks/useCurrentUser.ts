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

    function fetchJsonAsUser<T>(
        input: RequestInfo,
        init?: RequestInit
    ): Promise<T> {
        return fetch(input, {
            ...init,
            headers: {
                ...init?.headers,
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                let ans = data;
                const token = data.access_token;
                if (token) {
                    // console.log('token set!');
                    setAccessToken(token);
                    delete ans['access_token'];
                }
                return ans as T;
            });
    }

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
        fetchAsUser('/api/users/logout');
        removeAccessToken();
        setUser(null as any);
        setCollections(null as any);
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
                // console.log('fetched user');
            })
            .catch(e => {});
    };
    return { fetchUser, fetchAsUser, fetchJsonAsUser, logInUser, logOutUser };
}

