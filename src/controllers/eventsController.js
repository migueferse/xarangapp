import eventsService from "../services/eventsService";

const getAuthToken = () => {
  return sessionStorage.getItem('authToken');
};

const getAllEvents = async () => {
  const token = getAuthToken();
  try {
    const events = await eventsService.getEvents(token);
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

const createEvent = async (eventData) => {
  const token = getAuthToken();
  return await eventsService.addEvent(eventData, token);
};

const updateEvent = async (id, updatedData) => {
  const token = getAuthToken();
  return await eventsService.editEvent(id, updatedData, token);
};

const removeEvent = async (id) => {
  const token = getAuthToken();
  return await eventsService.deleteEvent(id, token);
};

const getEventById = async (id) => {
  const token = getAuthToken();
  return await eventsService.getEventById(id, token);
};

export default {
  getAllEvents,
  createEvent,
  updateEvent,
  removeEvent,
  getEventById,
  // createOrUpdateEvent,
  // addMusicianToEvent,
};
