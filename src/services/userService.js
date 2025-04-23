import API from "../api/axios";

const getUser = async (token) => {
    try {
        const response = await API.get("/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

export default {
    getUser,
};