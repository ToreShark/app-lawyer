import React, {FC, useState} from "react";
import {Accordion, AccordionSummary, AccordionDetails, TextField, Typography, Button} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {createReply} from "../hooks/useCreateReply";

interface Reply {
    userName: string;
    text: string;
    createdAt: string;
}

interface Props {
    replies: Reply[];
    onNewReply: (commentId: string, newReply: any) => void;
    commentId: string;
}

const ReplySection: FC<Props> = ({ replies, onNewReply, commentId}) => {
    const [newReply, setNewReply] = useState("");

    const handleAddReply = async () => {
        if (newReply.trim()) {
            try {
                const createdReply = await createReply(commentId, newReply);
                onNewReply(commentId, {
                    id: createdReply.id,
                    userName: createdReply.userName,
                    text: createdReply.text,
                });
                setNewReply("");
            } catch (error) {
                console.error("Failed to add reply:", error);
            }
        }
    };
    
    return (
        <div>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Показать ответы</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {replies && replies.length > 0 ? (
                        replies.map((reply, index) => (
                            <div key={index}>
                                <p className="reply">
                                    <strong>{reply.userName}:</strong>
                                    {reply.text}
                                </p>
                                <p className="reply-date">
                                    {new Date(reply.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>Нет ответов</p>
                    )}
                    <TextField
                        label="Добавить ответ"
                        fullWidth
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                    />
                    <Button onClick={handleAddReply}>Добавить</Button>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default ReplySection;
