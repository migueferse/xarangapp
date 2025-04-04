import API from "../api/axios";

const getMusicians = async () => {
  try {
    const response = await API.get("/musicians");
    console.log('Musicos', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching musicians:", error);
    throw error;
  }
};

const getMusicianById = async (id) => {
  try {
    const response = await API.get(`/musicians/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching musician:", error);
    throw error;
  }
};

const addMusician = async (newMusician) => {
  try {
    console.log(newMusician);
    const response = await API.post("/musicians", newMusician);
    return response.data;
  } catch (error) {
    console.error("Error adding musician:", error);
    throw error;
  }
};

const editMusician = async (id, updatedMusician) => {
  try {
    const response = await API.put(`/musicians/${id}`, updatedMusician);
    return response.data;
  } catch (error) {
    console.error("Error editing musician:", error);
    throw error;
  }
};

const deleteMusician = async (id) => {
  try {
    await API.delete(`/musicians/${id}`);
  } catch (error) {
    console.error("Error deleting musician:", error);
    throw error;
  }
};

const getInstruments = async () => {
  try {
    const response = await API.get("/instruments");
    return response.data;
  } catch (error) {
    console.error("Error fetching instruments:", error);
    throw error;
  }
};

export default {
  getMusicians,
  getMusicianById,
  addMusician,
  editMusician,
  deleteMusician,
  getInstruments,
};
