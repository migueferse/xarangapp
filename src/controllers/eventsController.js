import eventsService from "../services/eventsService";

const getAllEvents = async () => {
  try {
    const events = await eventsService.getEvents();
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

const createEvent = async (eventData) => {
  return await eventsService.addEvent(eventData);
};

const updateEvent = async (id, updatedData) => {
  return await eventsService.editEvent(id, updatedData);
};

const removeEvent = async (id) => {
  return await eventsService.deleteEvent(id);
};

const getEventById = async (id) => {
  return await eventsService.getEventById(id);
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
