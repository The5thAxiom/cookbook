import create from 'zustand';

const collectionStore = create<{
    collections: collection[];
    setCollections: (collections: collection[]) => void;
}>(set => ({
    collections: null as any,
    setCollections: (collections: collection[]) =>
        set(state => ({ collections: collections }))
}));

export default collectionStore;
