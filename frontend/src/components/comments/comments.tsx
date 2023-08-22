import React from 'react';
import CommentWithReplies from './commentWithReplies';

export default function Comments({
    recipe,
    comments,
    fetchComments
}: {
    recipe: recipeFull;
    comments: comment[];
    fetchComments: () => void;
}) {
    return (
        <div>
            {comments.length > 0 ? (
                <>
                    {comments.map(comment => (
                        <div key={comment.id}>
                            <CommentWithReplies
                                isBaseLevel={true}
                                recipe={recipe}
                                comment={comment}
                                fetchComments={fetchComments}
                            />
                        </div>
                    ))}
                </>
            ) : (
                <>No comments found :(</>
            )}
        </div>
    );
}
