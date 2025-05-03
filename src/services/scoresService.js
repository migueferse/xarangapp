import API from "../api/axios";

const getScores = async (token, params = '') => {
  try {
    const response = await API.get(`/scores${params}`, {
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

const uploadScore = async (file, title, instrumentId, token) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('instrument_id', instrumentId);

  try {
    const response = await API.post("/scores", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading score:", error);
    throw error;
  }
};

const deleteScore = async (id, token) => {
  try {
    await API.delete(`/scores/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting score:", error);
    throw error;
  }
};

const getInstruments = async (token) => {
  try {
    const response = await API.get("/instruments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching instruments:", error);
    throw error;
  }
};

export default {
  getScores,
  uploadScore,
  deleteScore,
  getInstruments,
};
