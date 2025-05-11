import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerController from "../../controllers/registerController";
import ConfirmModal from "./ConfirmModal";
import "../../styles/main.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [registerError, setRegisterError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "name" && !value.trim()) {
      error = "El nombre es obligatorio.";
    }

    if (name === "email" && !value.trim()) {
      error = "El correo electrónico es obligatorio.";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "El correo electrónico no tiene un formato válido.";
    }

    if (name === "password" && !value.trim()) {
      error = "La contraseña es obligatoria.";
    }

    if (name === "password_confirmation" && value !== formData.password) {
      error = "Las contraseñas no coinciden.";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!formData.email.trim()) newErrors.email = "El correo electrónico es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "El correo electrónico no tiene un formato válido.";
    if (!formData.password.trim()) newErrors.password = "La contraseña es obligatoria.";
    if (formData.password !== formData.password_confirmation) newErrors.password_confirmation = "Las contraseñas no coinciden.";

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      password: true,
      password_confirmation: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const result = await registerController.handleRegister(formData, setRegisterError);
      
      if (result.success) {
        setShowModal(true);
      }
    }
  };

  const renderFieldClass = (field) =>
    touched[field] && errors[field] ? "form-group has-error" : "form-group";

  const handleModalConfirm = () => {
    setShowModal(false);
    navigate("/login");
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="login-img container-fluid">
      <div className="row min-vh-100 align-items-center">
        <div className="col-md-6 d-none d-md-flex justify-content-center">
          <img
            src="/assets/LogoXulivert.png"
            alt="Ilustración registro"
            className="login-img-animated"
            style={{ maxHeight: "400px" }}
          />
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <form className="login-form shadow p-4 rounded bg-white login-form-animated" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4 text-primary">Registrarse</h2>
            {registerError && <div className="alert alert-danger">{registerError}</div>}

            <div className={renderFieldClass("name")}>
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
              />
              {touched.name && errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            <div className={renderFieldClass("email")}>
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                placeholder="nombre@correo.com"
                value={formData.email}
                onChange={handleChange}
              />
              {touched.email && errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className={renderFieldClass("password")}>
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                id="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
              />
              {touched.password && errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className={renderFieldClass("password_confirmation")}>
              <label htmlFor="password_confirmation" className="form-label">Confirmar Contraseña</label>
              <input
                type="password"
                className={`form-control ${errors.password_confirmation ? "is-invalid" : ""}`}
                id="password_confirmation"
                name="password_confirmation"
                placeholder="********"
                value={formData.password_confirmation}
                onChange={handleChange}
              />
              {touched.password_confirmation && errors.password_confirmation && (
                <div className="invalid-feedback">{errors.password_confirmation}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="role" className="form-label">Rol</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-control"
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Registrarse
              </button>
            </div>

            <div className="mt-3 text-center">
              <a href="/login" className="text-decoration-none">¿Ya tienes una cuenta? Iniciar sesión</a>
            </div>
          </form>
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        title="Registro Exitoso"
        message="¡Te has registrado con éxito! Ahora puedes iniciar sesión."
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </div>
  );
};

export default Register;
