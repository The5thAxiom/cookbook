import create from 'zustand';

const userStore = create<{
    user: userData;
    setUser: (user: userData) => void;
}>(set => ({
    user: null as any,
    setUser: (user: userData) => set(state => ({ user: user }))
}));

export default userStore;
