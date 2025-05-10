import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import eventsController from '../../controllers/eventsController';
import musiciansController from "../../controllers/musiciansController";
import ConfirmModal from "./ConfirmModal";
import '../../styles/main.scss';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

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

  const openDeleteModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const confirmDelete = async () => {
    try {
      await eventsController.removeEvent(selectedEvent.id);
      const updatedEvents = await eventsController.getAllEvents();
      setEvents(updatedEvents);
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting event:", error);
      if (error.response && error.response.status === 403) {
        alert("No tienes permisos para eliminar este evento.");
      } else {
        alert("Error al eliminar el evento.");
      }
      closeDeleteModal();
    }
  };

  return (
    <div className="events-page">
      <div className="events-card">
        <h2>Eventos</h2>

        {isAdmin && (
          <div className="text-end mb-3">
            <button onClick={handleCreate} className="btn btn-primary button-fade">
              Crear Evento
            </button>
          </div>
        )}

        {events.length > 0 ? (
          <ul className="list-group">
            {events.map((event) => (
              <li key={event.id} className="list-group-item event-fade">
                <div className="event-info">
                  <div className="event-name">{event.name}</div>
                  <div className="event-date-place text-muted">{event.date} – {event.place}</div>
                  <div className="event-musicians">
                    <strong>Músicos:</strong>
                    {event.accepted_musicians?.length > 0 ? (
                      <ul>
                        {event.accepted_musicians.map((entry) => {
                          const musician = entry.musician;
                          const instrument = musician?.instrument?.name || "Instrumento desconocido";
                          return (
                            <li key={musician.id}>
                              {musician.nickname || musician.name} - {instrument}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-muted">No hay músicos aceptados para este evento.</p>
                    )}
                  </div>
                </div>
                {isAdmin && (
                  <div className="btn-group">
                    <button onClick={() => handleEdit(event.id)} className="btn btn-warning btn-sm">Editar</button>
                    <button onClick={() => openDeleteModal(event)} className="btn btn-danger btn-sm">Eliminar</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No hay eventos disponibles.</p>
        )}
      </div>

      <ConfirmModal
        isOpen={showModal}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar el evento ${selectedEvent?.name}?`}
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
      />
    </div>
  );
};

export default EventsPage;
