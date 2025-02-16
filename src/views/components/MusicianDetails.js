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
    instrument: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (id) {
      const musician = musiciansController.getMusicianById(id);
      if (musician) {
        setFormData(musician);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    musiciansController.createOrUpdateMusician(formData);
    navigate("/musicians");
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
          <input
            type="text"
            name="instrument"
            value={formData.instrument}
            onChange={handleChange}
            required
          />
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
