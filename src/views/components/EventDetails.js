import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import eventsController from "../../controllers/eventsController";
import musiciansController from "../../controllers/musiciansController";
import "../../styles/events.css";

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
    try {
      if (id) {
        await eventsController.updateEvent(id, formData);
      } else {
        await eventsController.createEvent(formData);
      }
      navigate("/events");
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  return (
    <div className="container">
      <h2>{id ? "Editar Evento" : "Crear Nuevo Evento"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del Evento:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Fecha:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Lugar:</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Músicos:</label>
          <select
            multiple
            value={formData.musicians}
            onChange={handleMusicianSelect}
            className="form-control"
          >
            {allMusicians.map((musician) => (
              <option key={musician.id} value={musician.id}>
                {musician.name} ({musician.instrument.name})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Guardar Cambios" : "Crear Evento"}
        </button>
      </form>
    </div>
  );
};

export default EventDetailPage;
