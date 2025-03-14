const events = [
  { id: 1, name: "Moros i Cristians Torrent", date: "2024-06-15", musicians: [] },
  { id: 2, name: "Despedida solter", date: "2024-07-20", musicians: [] },
  { id: 3, name: "Festes del poble", date: "2024-08-05", musicians: [] },
];

const getEvents = () => {
  return [...events];
};

const getEventById = (id) => {
  return events.find((event) => event.id === parseInt(id));
};

const addEvent = (newEvent) => {
  newEvent.id = events.length + 1;
  events.push(newEvent);
};

const editEvent = (id, updatedEvent) => {
  const index = events.findIndex((event) => event.id === id);
  if (index !== -1) {
    events[index] = { ...events[index], ...updatedEvent };
  }
};

const deleteEvent = (id) => {
  const index = events.findIndex((event) => event.id === id);
  if (index !== -1) {
    events.splice(index, 1);
  }
  
};

const addMusicianToEvent = (eventId, musicianId) => {
  const event = getEventById(eventId);
  if (event) {
    event.musicians.push(musicianId);
  }
};


export default {
  getEvents,
  getEventById,
  addEvent,
  editEvent,
  deleteEvent,
  addMusicianToEvent,
};
