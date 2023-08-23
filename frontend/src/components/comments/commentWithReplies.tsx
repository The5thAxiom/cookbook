import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CommentForm from './commentForm';

import './comments.css';
import {
    MdArrowDropDown,
    MdArrowDropUp,
    MdCancel,
    MdReply
} from 'react-icons/md';

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
    const [showReplies, setShowReplies] = useState(false);
    return (
        <>
            <div className='comment'>
                <b>
                    <NavLink to={`/user/@${comment.commenter}`}>
                        @{comment.commenter}
                    </NavLink>
                </b>
                : {comment.text}{' '}
                <button onClick={() => setShowReplyForm(!showReplyForm)}>
                    {showReplyForm ? <MdCancel /> : <MdReply />}
                </button>
                {comment.replies.length > 0 && (
                    <button onClick={() => setShowReplies(!showReplies)}>
                        {showReplies ? <MdArrowDropUp /> : <MdArrowDropDown />}
                    </button>
                )}
            </div>
            <div style={{ display: showReplyForm ? 'block' : 'none' }}>
                <CommentForm
                    recipe={recipe}
                    reply_to={comment}
                    onSuccess={() => {
                        setShowReplyForm(false);
                        fetchComments();
                    }}
                />
            </div>
            {comment.replies.length > 0 && (
                <div
                    className='replies'
                    style={{ display: showReplies ? 'block' : 'none' }}
                >
                    {comment.replies.map(comment => (
                        <CommentWithReplies
                            key={comment.id}
                            isBaseLevel={false}
                            recipe={recipe}
                            comment={comment}
                            fetchComments={fetchComments}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
