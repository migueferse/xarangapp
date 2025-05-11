import API from "../api/axios";

const getMusicians = async (token) => {
  try {
    const response = await API.get("/musicians", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Musicos', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching musicians:", error);
    throw error;
  }
};

const getMusicianById = async (id, token) => {
  try {
    const response = await API.get(`/musicians/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching musician:", error);
    throw error;
  }
};

const getMusicianDetails = async (id, token) => {
  try {
    const response = await API.get(`/musicians/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching musician details with events:", error);
    throw error;
  }
};

const addMusician = async (newMusician, token) => {
  try {
    console.log(newMusician);
    const response = await API.post("/musicians", newMusician, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding musician:", error);
    throw error;
  }
};

const editMusician = async (id, updatedMusician, token) => {
  try {
    const response = await API.put(`/musicians/${id}`, updatedMusician, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing musician:", error);
    throw error;
  }
};

const deleteMusician = async (id, token) => {
  try {
    await API.delete(`/musicians/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting musician:", error);
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

const getPendingEvents = async (token) => {
  try {
      const response = await API.get("/musicians/pending-events", {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error("Error fetching pending events:", error);
      throw error;
  }
};

const acceptEvent = async (eventId, token) => {
  try {
      const response = await API.post(`/events/${eventId}/accept`, {}, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error("Error accepting event:", error);
      throw error;
  }
};

const rejectEvent = async (eventId, token) => {
  try {
      const response = await API.post(`/events/${eventId}/reject`, {}, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error("Error rejecting event:", error);
      throw error;
  }
};

const musiciansService = {
  getMusicians,
  getMusicianById,
  getMusicianDetails,
  addMusician,
  editMusician,
  deleteMusician,
  getInstruments,
  getPendingEvents,
  acceptEvent,
  rejectEvent,
};

export default musiciansService
