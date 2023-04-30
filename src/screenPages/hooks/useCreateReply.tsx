import instance from "../../api/createApi";

export const createReply = async (commentId: string, text: string) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await instance.post(
            "/reply",
            {
                commentId,
                text,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const createdReplyData = response.data;
        console.log("createdReplyData:", createdReplyData);
        return createdReplyData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
