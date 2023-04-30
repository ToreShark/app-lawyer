import {Box, Container, Grid, Typography, useMediaQuery} from "@mui/material";
import {useParams} from "react-router-dom";
import ReactPlayer from "react-player";
import Footer from "../footer/Footer";
import React, {useEffect, useState, CSSProperties} from "react";
import {useSubcategoryContent} from "./hooks/useSubcatContent";
import CommentsSection from "./comments/CommentSection";
import {getComments} from "./hooks/useComments";
import TextareaValidator from "./comments/CommentBox";
import {getReplies} from "./hooks/useReplies";

import ReplySection from "./replies/ReplySection";
import BasicTabs from "./tabs/BasicTabs";
import TemplateEditor from "./Template/TemplateEditor";

const videoContainerStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    paddingBottom: "56.25%",
};

const videoStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
};


export const SubcategoryContent = () => {
    const params = useParams<{ slug: string }>();
    const slug = params.slug || "";
    const {subcategory, isLoading, isError, error} =
        useSubcategoryContent(slug);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const isSmallScreen = useMediaQuery("(max-width:600px)");
    const isMediumScreen = useMediaQuery("(max-width:960px)");
    const [comments, setComments] = useState<any[]>([]);
    const [value, setValue] = React.useState(0);
    const [documents, setDocuments] = useState<any[]>([]);

    useEffect(() => {
        const updateCommentsAndReplies = async () => {
            if (subcategory && subcategory.id) {
                const commentsData = await getComments(subcategory.id);
                const updatedComments = await updateReplies(commentsData);
                setComments(updatedComments);
            }
        };

        updateCommentsAndReplies();
    }, [subcategory, comments.length]);

    const updateReplies = async (comments: any[]) => {
        const updatedComments = [...comments];
        for (const comment of updatedComments) {
            console.log("comment.id:", comment.id);
            const replies = await getReplies(comment.id);
            comment.replies = replies;
        }
        return updatedComments;
    };

    const handleNewComment = (newComment: any) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    const handleNewReply = (commentId: string, newReply: any) => {
        setComments((prevComments) => {
            const updatedComments = prevComments.map((comment) => {
                if (comment.id === commentId) {
                    return {...comment, replies: [...comment.replies, newReply]};
                }
                return comment;
            });
            return updatedComments;
        });
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        const errorMessage =
            error instanceof Error ? error.message : "An error occurred";
        return <div>Error: {errorMessage}</div>;
    }

    if (!subcategory) {
        return <div>No subcategory found with the provided slug</div>;
    }

    return (
        <Container maxWidth="lg">
            <Grid container justifyContent="center" bgcolor="#f5f5f5">
                <Grid item xs={12}>
                    <Box
                        margin="auto"
                        marginTop={8}
                        textAlign="left"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <h1>{subcategory.name}</h1>
                        <div style={videoContainerStyle}>
                            {subcategory.videos && subcategory.videos.length > 0 && (
                                <ReactPlayer
                                    url={subcategory.videos[currentVideoIndex].url}
                                    style={videoStyle}
                                    width="100%"
                                    height="100%"
                                    controls
                                />
                            )}
                        </div>
                        <div>
                            {subcategory.videos && subcategory.videos.map((video: { url: string, description: string }, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentVideoIndex(index)}
                                    style={{
                                        margin: '5px',
                                        backgroundColor: currentVideoIndex === index ? 'blue' : 'white',
                                    }}
                                >
                                    Видео {index + 1}
                                </button>
                            ))}
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <BasicTabs
                        value={value}
                        onChange={handleChange}
                        tab1Content={<Typography variant="h4">{subcategory.description}</Typography>}
                        tab2Content={
                            <Typography sx={{ padding: 0 }}>
                                {comments && Array.isArray(comments) ? (
                                    <CommentsSection comments={comments} onNewReply={handleNewReply}
                                                     setComments={setComments}/>
                                ) : (
                                    <div>No comments</div>
                                )}
                            </Typography>
                        }
                        tab3Content={
                            <TemplateEditor
                                template={
                                    subcategory.videos && subcategory.videos[currentVideoIndex].description
                                }
                                onDocumentCreated={(createdDocument) => setDocuments([...documents, createdDocument])}
                            />
                        }
                    />
                </Grid>
                <Grid item xs={10}>
                    <TextareaValidator subcategoryId={subcategory.id} onNewComment={handleNewComment}/>
                </Grid>
            </Grid>
            <Footer/>
        </Container>
    );
};
