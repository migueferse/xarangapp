import React, { useState, useEffect } from 'react';
import musiciansController from '../../controllers/musiciansController';
import eventsController from '../../controllers/eventsController';
// import '../../styles/pendingEvents.css'; // Crea un archivo CSS para este componente

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
            // Recargar la lista de eventos pendientes después de aceptar
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
            // Recargar la lista de eventos pendientes después de rechazar
            const updatedEvents = await musiciansController.getPendingEvents();
            setPendingEvents(updatedEvents);
            alert("Has rechazado el evento.");
        } catch (error) {
            console.error("Error al rechazar el evento:", error);
            alert("Error al rechazar el evento.");
        }
    };

    if (loading) {
        return <div>Cargando invitaciones pendientes...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="container">
            <h2>Invitaciones Pendientes</h2>
            {pendingEvents.length > 0 ? (
                <ul className="pending-event-list">
                    {pendingEvents.map(invitation => (
                        <li key={invitation.id} className="pending-event-item">
                            <span>
                                Evento: {invitation.event?.name} - {new Date(invitation.event?.date).toLocaleDateString()} ({invitation.event?.place})
                            </span>
                            <br />
                            <span>
                                Músico: {invitation.musician?.name} {invitation.musician?.lastName} ({invitation.musician?.nickname || invitation.musician?.email})
                            </span>
                            <div className="actions">
                                <button onClick={() => handleAccept(invitation.event.id)} className="btn btn-success">Aceptar</button>
                                <button onClick={() => handleReject(invitation.event.id)} className="btn btn-danger">Rechazar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tienes invitaciones pendientes.</p>
            )}
        </div>
    );
};

export default PendingEvents;