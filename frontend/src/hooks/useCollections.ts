import collectionStore from '../stores/collectionsStore';
import useCurrentUser from './useCurrentUser';
import useFetch from './useFetch';
import useMainAction from './useMainAction';

export default function useCollections(): {
    fetchCollections: () => void;
    addNewCollection: (collection_name: string) => void;
    removeCollection: (collection_name: string) => void;
    addToCollection: (collection_name: string, recipe: recipeMeta) => void;
    removeFromCollection: (collection_name: string, recipe: recipeMeta) => void;
} {
    const setCollections = collectionStore(state => state.setCollections);
    const user = useCurrentUser();

    const { fetchAsUser, fetchJsonAsUser } = useFetch();

    const { startMainAction, endMainAction } = useMainAction();

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
        startMainAction();
        const res = await fetchAsUser(`/api/collections/${collection_name}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipe_id: recipe.id })
        });
        if (res.ok) {
            window.alert(`${recipe.name} was added to ${collection_name}!`);
            await fetchCollections();
        } else window.alert('try again:(');
        endMainAction();
    };

    const removeFromCollection = async (
        collection_name: string,
        recipe: recipeMeta
    ) => {
        startMainAction();
        const res = await fetchAsUser(`/api/collections/${collection_name}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipe_id: recipe.id })
        });
        if (res.ok) {
            window.alert(`${recipe.name} was removed from ${collection_name}!`);
            await fetchCollections();
        } else window.alert('try again:(');
        endMainAction();
    };

    const addNewCollection = async (collection_name: string) => {
        startMainAction();
        const res = await fetchAsUser(`api/collections`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ collection_name: collection_name })
        });
        if (res.ok) {
            window.alert(`${collection_name} was added`);
            await fetchCollections();
        } else window.alert(`try again`);
        endMainAction();
    };

    const removeCollection = async (collection_name: string) => {
        startMainAction();
        const res = await fetchAsUser(`api/collections`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ collection_name: collection_name })
        });
        if (res.ok) {
            window.alert(`${collection_name} was deleted`);
            await fetchCollections();
        } else window.alert(`try again`);
        endMainAction();
    };

    return {
        fetchCollections,
        addNewCollection,
        removeCollection,
        addToCollection,
        removeFromCollection
    };
}

