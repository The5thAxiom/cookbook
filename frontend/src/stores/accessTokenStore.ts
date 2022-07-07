import create from 'zustand';

const accessTokenStore = create<{
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
    removeAccessToken: () => void;
}>(set => ({
    accessToken: localStorage.getItem('access_token') || '',
    setAccessToken: (accessToken: string) => {
        localStorage.setItem('access_token', accessToken);
        set({ accessToken });
    },
    removeAccessToken: () => {
        localStorage.setItem('access_token', '');
        set({ accessToken: '' });
    }
}));

export default accessTokenStore;

