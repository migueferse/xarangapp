import eventsService from "../services/eventsService";

const getAllEvents = () => {
  return eventsService.getEvents();
};

const createEvent = (eventData) => {
  eventsService.addEvent(eventData);
};

const updateEvent = (id, updatedData) => {
  eventsService.editEvent(id, updatedData);
};

const removeEvent = (id) => {
  eventsService.deleteEvent(id);
};

const getEventById = (id) => {
  return eventsService.getEventById(id);
};

const createOrUpdateEvent = (event) => {
  if (event.id) {
    eventsService.editEvent(event.id, event);
    alert("Evento actualizado con éxito.");
  } else {
    eventsService.addEvent(event);
    alert("Nuevo evento creado con éxito.");
  }
};

export default {
  getAllEvents,
  createEvent,
  updateEvent,
  removeEvent,
  getEventById,
  createOrUpdateEvent,
};
