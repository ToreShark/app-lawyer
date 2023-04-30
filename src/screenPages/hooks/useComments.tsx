import instance from "../../api/createApi";

export const getComments = async (subcategoryId: string) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await instance.get(
            `comment/subcategory/${subcategoryId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const commentsData = response.data;
        console.log("Comments data from server:", commentsData);
        return commentsData.map((comment: any) => ({
            id: comment.id,
            user: {
                firstName: comment.firstName || '',
            },
            text: comment.text,
            createdAt: comment.createdAt,
            repliesCount: comment.replies.length,
            likes: comment.likes,
            dislikes: comment.dislikes,
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};
