import API from "../api/axios";

const getEvents = async () => {
  try {
    const response = await API.get("/events");
    console.log('Events', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

const getEventById = async (id) => {
  try {
    const response = await API.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

const addEvent = async (newEvent) => {
  console.log('Created', newEvent);
  try {
    console.log(newEvent);
    const response = await API.post("/events", newEvent);
    return response.data;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

const editEvent = async (id, updatedEvent) => {
  console.log('Updated',updatedEvent);
  try {
    const response = await API.put(`/events/${id}`, updatedEvent);
    return response.data;
  } catch (error) {
    console.error("Error editing event:", error);
    throw error;
  }
};

const deleteEvent = async (id) => {
  try {
    await API.delete(`/events/${id}`);
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }  
};

// const addMusicianToEvent = (eventId, musicianId) => {
//   const event = getEventById(eventId);
//   if (event) {
//     event.musicians.push(musicianId);
//   }
// };


export default {
  getEvents,
  getEventById,
  addEvent,
  editEvent,
  deleteEvent,
  // addMusicianToEvent,
};
