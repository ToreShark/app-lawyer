import instance from "../../api/createApi";

export const likeComment = async (commentId: string) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await instance.post(
            `/votes/${commentId}/like`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const updatedCommentData = response.data;
        console.log("updatedCommentData (like):", updatedCommentData);
        return updatedCommentData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const dislikeComment = async (commentId: string) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await instance.post(
            `/votes/${commentId}/unlike`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const updatedCommentData = response.data;
        console.log("updatedCommentData (dislike):", updatedCommentData);
        return updatedCommentData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};