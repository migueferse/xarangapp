import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import eventsController from "../../controllers/eventsController";
import musiciansController from "../../controllers/musiciansController";
import "../../styles/main.scss";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    place: "",
    date: "",
    musicians: [],
  });

  const [allMusicians, setAllMusicians] = useState([]);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const musiciansData = await musiciansController.getAllMusicians();
        setAllMusicians(musiciansData);

        if (id) {
          const eventData = await eventsController.getEventById(id);
          if (eventData) {
            setFormData({
              name: eventData.name,
              place: eventData.place,
              date: eventData.date,
              musicians: eventData.accepted_musicians.map(am => am.musician?.id.toString()) || []
            });
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre del evento es obligatorio.";
    if (!formData.place.trim()) newErrors.place = "El lugar es obligatorio.";
    if (!formData.date.trim()) newErrors.date = "La fecha es obligatoria.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMusicianSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData({ ...formData, musicians: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setServerError("");
      return;
    }

    try {
      if (id) {
        await eventsController.updateEvent(id, formData);
      } else {
        await eventsController.createEvent(formData);
      }
      navigate("/events");
    } catch (error) {
      console.error("Error submitting event:", error);
      setServerError("Hubo un problema al guardar el evento. Inténtalo de nuevo.");
    }
  };

  const handleBack = () => {
    navigate("/events");
  };

  return (
    <div className="events-page">
      <div className="events-card">
        <h2>{id ? "Editar Evento" : "Crear Nuevo Evento"}</h2>
        <form onSubmit={handleSubmit} className="event-form">
          {serverError && <div className="error-banner">{serverError}</div>}
          <div className="form-group">
            <label>Nombre del Evento:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? "input-error" : ""}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label>Lugar:</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className={errors.place ? "input-error" : ""}
            />
            {errors.place && <span className="error-message">{errors.place}</span>}
          </div>

          <div className="form-group">
            <label>Músicos:</label>
            <select
              multiple
              value={formData.musicians}
              onChange={handleMusicianSelect}
            >
              {allMusicians.map((musician) => (
                <option key={musician.id} value={musician.id}>
                  {musician.name} ({musician.instrument.name})
                </option>
              ))}
            </select>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              {id ? "Guardar Cambios" : "Crear Evento"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleBack}>
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventDetailPage;
