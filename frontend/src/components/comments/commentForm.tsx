import React, { useState } from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import useFetch from '../../hooks/useFetch';

export default function CommentForm({
    recipe,
    reply_to,
    onSuccess
}: {
    recipe: recipeFull;
    reply_to?: comment;
    onSuccess: () => void;
}) {
    const { fetchAsUser } = useFetch();
    const [text, setText] = useState<string>('');

    async function addComment() {
        const commentData = {
            is_reply: reply_to !== undefined,
            original_comment_id: reply_to ? reply_to.id : null,
            text
        };
        const res = await fetchAsUser(
            `/api/recipes/${recipe.id}/comments/add`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commentData)
            }
        );
        if (res.ok) {
            alert('comment added!');
            onSuccess();
            setText('');
        } else {
            const data = await res.json();
            alert(data.msg);
        }
    }

    return (
        <>
            <input
                placeholder={
                    reply_to ? 'Addy your reply here' : 'Add your comment here'
                }
                onChange={e => setText(e.target.value)}
                value={text}
            />
            <button onClick={addComment}>
                {reply_to ? 'Reply' : 'Comment'}
            </button>
        </>
    );
}
