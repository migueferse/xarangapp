import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import musiciansController from "../../controllers/musiciansController";
import "../../styles/main.scss";

const MusicianDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [musician, setMusician] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMusicianDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await musiciansController.getMusicianDetails(id);
        setMusician(data);
      } catch (err) {
        setError("Error al cargar los detalles del músico.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMusicianDetails();
  }, [id]);

  if (loading) {
    return <div className="musicians-page">Cargando detalles del músico...</div>;
  }

  if (error) {
    return <div className="musicians-page error-message">{error}</div>;
  }

  if (!musician) {
    return <div className="musicians-page">Músico no encontrado.</div>;
  }

  return (
    <div className="musicians-page">
      <div className="musicians-card">
        <h2>Detalles del Músico: {musician.name} {musician.lastName}</h2>

        <div className="form-group">
          <label>Apodo:</label>
          <p>{musician.nickname || 'No asignado'}</p>
        </div>

        <div className="form-group">
          <label>Instrumento:</label>
          <p>{musician.instrument?.name || 'No asignado'}</p>
        </div>

        <div className="form-group">
          <label>Teléfono:</label>
          <p>{musician.phone || 'No asignado'}</p>
        </div>

        <div className="form-group">
          <label>Correo Electrónico:</label>
          <p>{musician.email || 'No asignado'}</p>
        </div>

        <div className="form-group">
          <h3>Eventos aceptados:</h3>
          {musician.accepted_events && musician.accepted_events.length > 0 ? (
            <ul className="event-history-list">
              {musician.accepted_events.map((ev) => (
                <li key={ev.id} className="event-history-item">
                  {ev.event?.name || 'Evento desconocido'} –{" "}
                  {ev.event?.date ? new Date(ev.event.date).toLocaleDateString() : 'Sin fecha'} –{" "}
                  {ev.event?.place || 'Lugar no especificado'}
                </li>
              ))}
            </ul>
          ) : (
            <p>Este músico no ha aceptado participar en ningún evento aún.</p>
          )}
        </div>

        <div className="form-buttons">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/musicians")}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicianDetailsPage;
