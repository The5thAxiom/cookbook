import React, { useState } from 'react';
import CommentForm from './commentForm';

import './comments.css';

export default function CommentWithReplies({
    isBaseLevel,
    recipe,
    comment,
    fetchComments
}: {
    isBaseLevel: boolean;
    recipe: recipeFull;
    comment: comment;
    fetchComments: () => void;
}) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    return (
        <>
            <b>{comment.commenter}</b>: {comment.text}{' '}
            <button onClick={() => setShowReplyForm(!showReplyForm)}>
                {showReplyForm ? 'Cancel' : 'Reply'}
            </button>
            <div
                style={{
                    display: showReplyForm ? 'block' : 'none'
                }}
            >
                <CommentForm
                    recipe={recipe}
                    reply_to={comment}
                    onSuccess={() => {
                        setShowReplyForm(false);
                        fetchComments();
                    }}
                />
            </div>
            {comment.replies.length > 0 &&
                comment.replies.map(comment => (
                    <div key={comment.id} className='reply-block'>
                        <CommentWithReplies
                            isBaseLevel={false}
                            recipe={recipe}
                            comment={comment}
                            fetchComments={fetchComments}
                        />
                    </div>
                ))}
        </>
    );
}
