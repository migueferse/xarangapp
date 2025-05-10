import React, { useState, useEffect } from 'react';
import musiciansController from '../../controllers/musiciansController';
import '../../styles/main.scss';

const PendingEvents = () => {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await musiciansController.getPendingEvents();
        setPendingEvents(data);
      } catch (err) {
        setError("Error al cargar las invitaciones pendientes.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingEvents();
  }, []);

  const handleAccept = async (eventId) => {
    try {
      await musiciansController.acceptEvent(eventId);
      const updatedEvents = await musiciansController.getPendingEvents();
      setPendingEvents(updatedEvents);
      alert("Has aceptado el evento.");
    } catch (error) {
      console.error("Error al aceptar el evento:", error);
      alert("Error al aceptar el evento.");
    }
  };

  const handleReject = async (eventId) => {
    try {
      await musiciansController.rejectEvent(eventId);
      const updatedEvents = await musiciansController.getPendingEvents();
      setPendingEvents(updatedEvents);
      alert("Has rechazado el evento.");
    } catch (error) {
      console.error("Error al rechazar el evento:", error);
      alert("Error al rechazar el evento.");
    }
  };

  if (loading) {
    return (
      <div className="events-page">
        <div className="events-card">
          <h2>Invitaciones Pendientes</h2>
          <div className="text-center">
            <div className="loading-message">
              Cargando invitaciones pendientes...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="error-banner">{error}</div>;
  }

  return (
    <div className="events-page">
      <div className="events-card">
        <h2>Invitaciones Pendientes</h2>

        {pendingEvents.length > 0 ? (
          <ul className="list-group">
            {pendingEvents.map((invitation) => (
              <li key={invitation.id} className="list-group-item event-fade">
                <div className="event-info">
                  <div className="event-name">{invitation.event?.name}</div>
                  <div className="event-date-place text-muted">
                    {new Date(invitation.event?.date).toLocaleDateString()} – {invitation.event?.place}
                  </div>
                  <div className="event-musician">
                    <strong>Músico:</strong> {invitation.musician?.name} {invitation.musician?.lastName} ({invitation.musician?.nickname || invitation.musician?.email})
                  </div>
                </div>
                <div className="form-buttons">
                  <button onClick={() => handleAccept(invitation.event.id)} className="btn btn-success btn-sm">Aceptar</button>
                  <button onClick={() => handleReject(invitation.event.id)} className="btn btn-danger btn-sm">Rechazar</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No tienes invitaciones pendientes.</p>
        )}
      </div>
    </div>
  );
};

export default PendingEvents;
