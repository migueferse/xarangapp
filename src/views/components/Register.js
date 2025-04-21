import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../../styles/register.css';
import registerController from '../../controllers/registerController'; // Importa el controlador de registro

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user',
  });
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterError('');

    try {
      const success = await registerController.handleRegister(formData, navigate, setRegisterError);
      if (success) {
        // La navegación al login se maneja dentro del controlador
      }
    } catch (error) {
      console.error('Error general en el registro:', error);
      setRegisterError('Error inesperado al registrarse.');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Registrarse</h2>
        {registerError && <div className="error-message">{registerError}</div>}
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Contraseña"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Rol:</label>
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
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">
            Registrarse
          </button>
        </div>
        <div className="form-group text-center">
          <a href="/login">¿Ya tienes una cuenta? Iniciar Sesión</a>
        </div>
      </form>
    </div>
  );
};

export default Register;