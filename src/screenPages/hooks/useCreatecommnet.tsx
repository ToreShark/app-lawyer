import instance from "../../api/createApi";

export const createComment = async (
    subcategoryId: string,
    text: string,
) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await instance.post("/comment", {
            subcategoryId,
            text,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const createdCommentData = response.data;
        console.log("createdCommentData:", createdCommentData);
        return createdCommentData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
