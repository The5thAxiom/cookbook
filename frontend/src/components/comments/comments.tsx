import React from 'react';

function printComment({ commenter, text, replies, id }: comment) {
    return (
        <div key={id}>
            <b>{commenter}</b>: {text}
            {replies.length > 0 && replies.map(printComment)}
        </div>
    );
}

export default function Comments({ comments }: { comments: comment[] }) {
    return (
        <div>
            {comments.length > 0 ? (
                <>{comments.map(printComment)}</>
            ) : (
                <>No comments found :(</>
            )}
        </div>
    );
}
