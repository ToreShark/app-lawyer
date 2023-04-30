import instance from "../../api/createApi";

export const getReplies = async (id: string) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await instance.get(
            `reply/comment/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const repliesData = response.data;
        return repliesData.map((reply: any) => ({
            userName: reply.userName,
            text: reply.text,
            createdAt: reply.createdAt,
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};