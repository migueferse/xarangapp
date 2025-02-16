import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import eventsController from '../../controllers/eventsController';
import '../../styles/events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
   const navigate = useNavigate();

  useEffect(() => {
    setEvents(eventsController.getAllEvents());
  }, []);

  const handleCreate = () => {
    navigate("/events/new");
  };
  
  const handleEdit = (id) => {
    navigate(`/events/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      eventsController.removeEvent(id);
      setEvents(eventsController.getAllEvents());
    }
  };

  return (
    <div className="container">
      <h2>Eventos</h2>
      <button onClick={handleCreate} className="btn btn-primary mb-3">Crear Evento</button>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event.id} className="event-item">
            <span>{event.name} - {event.date}</span>
            <button onClick={() => handleEdit(event.id)} className="btn btn-warning">Editar</button>
            <button onClick={() => handleDelete(event.id)} className="btn btn-danger">Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
