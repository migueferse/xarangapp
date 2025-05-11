import React, { useState, useEffect } from 'react';
import musiciansController from '../../controllers/musiciansController';
import ConfirmModal from './ConfirmModal';
import '../../styles/main.scss';

const PendingEvents = () => {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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
      setModalMessage("Has aceptado el evento.");
      setShowModal(true);
    } catch (error) {
      console.error("Error al aceptar el evento:", error);
      setModalMessage("Error al aceptar el evento.");
      setShowModal(true);
    }
  };

  const handleReject = async (eventId) => {
    try {
      await musiciansController.rejectEvent(eventId);
      const updatedEvents = await musiciansController.getPendingEvents();
      setPendingEvents(updatedEvents);
      setModalMessage("Has rechazado el evento.");
      setShowModal(true);
    } catch (error) {
      console.error("Error al rechazar el evento:", error);
      setModalMessage("Error al rechazar el evento.");
      setShowModal(true);
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
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

      <ConfirmModal
        isOpen={showModal}
        title="Resultado de la Acción"
        message={modalMessage}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
};

export default PendingEvents;
