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

// const createOrUpdateEvent = (event) => {
//   if (event.id) {
//     eventsService.editEvent(event.id, event);
//     alert("Evento actualizado con éxito.");
//   } else {
//     eventsService.addEvent(event);
//     alert("Nuevo evento creado con éxito.");
//   }
// };

// const addMusicianToEvent = (eventId, musicianId) => {
//   eventsService.addMusicianToEvent(eventId, musicianId);
// };

export default {
  getAllEvents,
  createEvent,
  updateEvent,
  removeEvent,
  getEventById,
  // createOrUpdateEvent,
  // addMusicianToEvent,
};
