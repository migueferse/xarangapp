import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import musiciansController from "../../controllers/musiciansController";
import '../../styles/musicians.css';

const MusicianDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    nickname: "",
    instrument_id: "",
    phone: "",
    email: "",
  });

  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instrumentData = await musiciansController.getInstruments();
        setInstruments(instrumentData);

        if (id) {
          const musician = await musiciansController.getMusicianById(id);
          if (musician) {
            setFormData({
              ...musician,
              instrument_id: musician.instrument_id || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await musiciansController.updateMusician(id, formData);
      } else {
        await musiciansController.createMusician(formData);
      }
      navigate("/musicians");
    } catch (error) {
      console.error("Error saving musician:", error);
    }
  };

  return (
    <div className="container">
      <h2>{id ? "Editar Músico" : "Crear Nuevo Músico"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Apellidos:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Apodo:</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Instrumento:</label>
          <select name="instrument_id" value={formData.instrument_id || ""} onChange={handleChange} required>
            <option value="">Selecciona un instrumento</option>
            {instruments.length > 0 ? (
              instruments.map((instrument) => (
                <option key={instrument.id} value={instrument.id}>
                  {instrument.name}
                </option>
              ))
            ) : (
              <option disabled>Cargando instrumentos...</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Guardar Cambios" : "Crear Músico"}
        </button>
      </form>
    </div>
  );
};

export default MusicianDetailPage;
