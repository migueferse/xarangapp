import API from "../api/axios";

export const getScores = async (token) => {
  try {
    const response = await API.get('/scores', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching scores:", error);
    throw error;
  }
};

export const uploadScore = async (file, title, token) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  try {
    const response = await API.post('/scores', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading score:', error.response?.data?.errors || error.message);
    throw error;
  }
};

export const deleteScore = async (id, token) => {
  try {
    const response = await API.delete(`/scores/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting score:", error);
    throw error;
  }
};

