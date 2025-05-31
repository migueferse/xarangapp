import API from "../api/axios";

const getEvents = async (token) => {
  try {
    const response = await API.get("/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

const getEventById = async (id, token) => {
  try {
    const response = await API.get(`/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

const addEvent = async (newEvent, token) => {
  try {
    const response = await API.post("/events", newEvent, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

const editEvent = async (id, updatedEvent, token) => {
  try {
    const response = await API.put(`/events/${id}`, updatedEvent, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing event:", error);
    throw error;
  }
};

const deleteEvent = async (id, token) => {
  try {
    await API.delete(`/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }  
};

const eventsService =  {
  getEvents,
  getEventById,
  addEvent,
  editEvent,
  deleteEvent,
};

export default eventsService
