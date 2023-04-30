import React, { FC } from "react";
import '../../css/CommentsSection.css';
import ReplySection from "../replies/ReplySection";
import {dislikeComment, likeComment} from "../hooks/useLikes";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

interface Comment {
    id: string;
    user: {
        firstName: string;
    };
    text: string;
    createdAt: string;
    replies: any[];
    onNewReply: (commentId: string, newReply: any) => void;
    repliesCount: number;
    likes: number;
    dislikes: number;
}

interface Props {
    comments: Comment[];
    onNewReply: (commentId: string, newReply: any) => void;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const CommentsSection: FC<Props> = ({ comments, onNewReply, setComments }) => {
    const handleLike = async (commentId: string) => {
        try {
            const updatedCommentData = await likeComment(commentId);
            const updatedComments = comments.map((comment) =>
                comment.id === commentId ? { ...comment, likes: updatedCommentData.likes } : comment
            );
            console.log('updatedComments:', updatedComments);
            setComments(updatedComments);
        } catch (error) {
            console.error("Error liking comment:", error);
        }
    };

    const handleDislike = async (commentId: string) => {
        try {
            const updatedCommentData = await dislikeComment(commentId);
            const updatedComments = comments.map((comment) =>
                comment.id === commentId ? { ...comment, dislikes: updatedCommentData.dislikes } : comment
            );
            setComments(updatedComments);
        } catch (error) {
            console.error("Error disliking comment:", error);
        }
    };


    return (
        <div style={{ padding: 0 }}>
            {comments.map((comment, index) => (
                <div key={index} className="commentBox">
                    <p className="comment">
                        <strong>
                            {comment.user && comment.user.firstName}:
                        </strong>
                        {comment.text}
                    </p>
                    <p className="comment-date">
                        {new Date(comment.createdAt).toLocaleString()}
                        <button onClick={() => handleLike(comment.id)}><ThumbUpIcon /></button>
                        <span className="likes-count">{comment.likes ?? 0}</span>
                        <button onClick={() => handleDislike(comment.id)}><ThumbDownAltIcon /></button>
                    </p>
                    <p className="replies-count">
                        Ответов: {comment.repliesCount}
                    </p>
                    <ReplySection replies={comment.replies} onNewReply={onNewReply} commentId={comment.id} />
                </div>
            ))}
        </div>
    );
};

export default CommentsSection;