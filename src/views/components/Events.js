import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import eventsController from '../../controllers/eventsController';
import musiciansController from "../../controllers/musiciansController";
import '../../styles/events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await eventsController.getAllEvents();
        setEvents(eventsData);

        const instrumentsData = await musiciansController.getInstruments();
        setInstruments(instrumentsData);
      } catch (error) {
        console.error("Error fetching events or instruments:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreate = () => {
    navigate("/events/new");
  };

  const handleEdit = (id) => {
    navigate(`/events/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      try {
        await eventsController.removeEvent(id);
        const updatedEvents = await eventsController.getAllEvents();
        setEvents(updatedEvents);
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Eventos</h2>
      <button onClick={handleCreate} className="btn btn-primary mb-3">Crear Evento</button>
      <ul className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <li key={event.id} className="event-item">
              <span>{event.name} - {event.date} ({event.place})</span>
              <div>
                <strong>Músicos:</strong>
                {event.musicians.length > 0 ? (
                  <ul>
                    {event.musicians.map((musician) => {
                      const instrumentName = musician.instrument
                        ? musician.instrument.name
                        : instruments.find(inst => inst.id === musician.instrument_id)?.name || "Instrumento desconocido";
                      
                      return (
                        <li key={musician.id}>
                          {musician.nickname ? musician.nickname : `${musician.name}`} - {instrumentName}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p>No hay músicos asignados a este evento.</p>
                )}
              </div>
              <button onClick={() => handleEdit(event.id)} className="btn btn-warning">Editar</button>
              <button onClick={() => handleDelete(event.id)} className="btn btn-danger">Eliminar</button>
            </li>
          ))
        ) : (
          <p>No hay eventos disponibles</p>
        )}
      </ul>
    </div>
  );
};

export default Events;
