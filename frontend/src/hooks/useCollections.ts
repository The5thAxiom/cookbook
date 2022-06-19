import collectionStore from '../stores/collectionsStore';
import userStore from '../stores/userStore';
import useFetch from './useFetch';

export default function useCollections(): {
    fetchCollections: () => void;
    addNewCollection: (collection_name: string) => void;
    removeCollection: (collection_name: string) => void;
    addToCollection: (collection_name: string, recipe: recipeMeta) => void;
    removeFromCollection: (collection_name: string, recipe: recipeMeta) => void;
} {
    const setCollections = collectionStore(state => state.setCollections);
    const user = userStore(state => state.user);

    const { fetchAsUser, fetchJsonAsUser } = useFetch();

    const fetchCollections = async () => {
        if (user) {
            const data = await fetchJsonAsUser<{ collections: collection[] }>(
                `/api/collections`
            );
            if (data) {
                setCollections(data.collections);
                // console.log('fetched collections');
            } else console.log("couldn't fetch collections");
        }
    };

    const addToCollection = async (
        collection_name: string,
        recipe: recipeMeta
    ) => {
        const res = await fetchAsUser(`/api/collections/${collection_name}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipe_id: recipe.id })
        });
        if (res.ok) {
            window.alert(`${recipe.name} was added to ${collection_name}!`);
            fetchCollections();
        } else window.alert('try again:(');
    };

    const removeFromCollection = async (
        collection_name: string,
        recipe: recipeMeta
    ) => {
        const res = await fetchAsUser(`/api/collections/${collection_name}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipe_id: recipe.id })
        });
        if (res.ok) {
            window.alert(`${recipe.name} was removed from ${collection_name}!`);
            fetchCollections();
        } else window.alert('try again:(');
    };

    const addNewCollection = async (collection_name: string) => {
        const res = await fetchAsUser(`api/collections`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ collection_name: collection_name })
        });
        if (res.ok) {
            window.alert(`${collection_name} was added`);
            fetchCollections();
        } else window.alert(`try again`);
    };

    const removeCollection = async (collection_name: string) => {
        const res = await fetchAsUser(`api/collections`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ collection_name: collection_name })
        });
        if (res.ok) {
            window.alert(`${collection_name} was deleted`);
            fetchCollections();
        } else window.alert(`try again`);
    };

    return {
        fetchCollections,
        addNewCollection,
        removeCollection,
        addToCollection,
        removeFromCollection
    };
}

