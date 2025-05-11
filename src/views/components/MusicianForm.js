import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import musiciansController from "../../controllers/musiciansController";
import "../../styles/main.scss";

const MusicianFormPage = () => {
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

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
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
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  };

  const handleBack = () => {
    navigate("/musicians");
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "name" && !value.trim()) {
      error = "El nombre es obligatorio.";
    }

    if (name === "instrument_id" && !value) {
      error = "Selecciona un instrumento.";
    }

    if (name === "phone" && !value.trim()) {
      error = "El teléfono es obligatorio.";
    } else if (name === "phone" && !/^\d{9}$/.test(value)) {
      error = "El teléfono debe ser un número válido de 9 dígitos.";
    }

    if (name === "email" && !value.trim()) {
      error = "El correo electrónico es obligatorio.";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "El correo electrónico no tiene un formato válido.";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!formData.instrument_id) newErrors.instrument_id = "Debes seleccionar un instrumento.";
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es obligatorio.";
    if (!/^\d{9}$/.test(formData.phone)) newErrors.phone = "El teléfono debe ser un número válido de 9 dígitos.";
    if (!formData.email.trim()) newErrors.email = "El correo electrónico es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "El correo electrónico no tiene un formato válido.";

    setErrors(newErrors);
    setTouched({
      name: true,
      instrument_id: true,
      phone: true,
      email: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        if (id) {
          await musiciansController.updateMusician(id, formData);
        } else {
          await musiciansController.createMusician(formData);
        }
        navigate("/musicians");
      } catch (error) {
        if (error.response && error.response.status === 422) {
          const serverErrors = error.response.data.errors;
          const newErrors = {};
          Object.entries(serverErrors).forEach(([field, messages]) => {
            newErrors[field] = Array.isArray(messages) ? messages[0] : messages;
          });

          setErrors((prev) => ({
            ...prev,
            ...newErrors,
          }));

          setTouched((prev) => ({
            ...prev,
            ...Object.fromEntries(Object.keys(newErrors).map((f) => [f, true])),
          }));
        } else {
          console.error("Error inesperado:", error);
          alert("Ocurrió un error al guardar el músico.");
        }
      }
    }
  };

  const renderFieldClass = (field) =>
    touched[field] && errors[field] ? "form-group has-error" : "form-group";

  return (
    <div className="musicians-page">
      <div className="musicians-card">
        <h2>{id ? "Editar Músico" : "Crear Nuevo Músico"}</h2>
        <form onSubmit={handleSubmit} className="musician-form">
          {/* Nombre */}
          <div className={renderFieldClass("name")}>
            <label>Nombre: *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {touched.name && errors.name && (
              <div className="error-message">{errors.name}</div>
            )}
          </div>

          {/* Apellidos */}
          <div className="form-group">
            <label>Apellidos:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Apodo */}
          <div className="form-group">
            <label>Apodo:</label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </div>

          {/* Instrumento */}
          <div className={renderFieldClass("instrument_id")}>
            <label>Instrumento:</label>
            <select
              name="instrument_id"
              value={formData.instrument_id || ""}
              onChange={handleChange}
            >
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
            {touched.instrument_id && errors.instrument_id && (
              <div className="error-message">{errors.instrument_id}</div>
            )}
          </div>

          {/* Teléfono */}
          <div className={renderFieldClass("phone")}>
            <label>Teléfono: *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {touched.phone && errors.phone && (
              <div className="error-message">{errors.phone}</div>
            )}
          </div>

          {/* Email */}
          <div className={renderFieldClass("email")}>
            <label>Correo Electrónico: *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {touched.email && errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          {/* Botón */}
          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              {id ? "Guardar Cambios" : "Crear Músico"}
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

export default MusicianFormPage;
