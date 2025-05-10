import React, { useState } from 'react';
import loginController from '../../controllers/loginController';
import '../../styles/main.scss';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const { handleLogin, loginError } = loginController();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailValid(emailRegex.test(value));
    }

    if (name === 'password') {
      setPasswordValid(value.trim() !== '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isEmailValid = formData.email.trim() !== '';
    const isPasswordValid = formData.password.trim() !== '';
    setEmailValid(isEmailValid);
    setPasswordValid(isPasswordValid);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    const success = await handleLogin(formData);
    if (success) {
    }
  };

  return (
    <div className="login-img container-fluid">
      <div className="row min-vh-100 align-items-center">
        <div className="col-md-6 d-none d-md-flex justify-content-center">
          <img
            src="/assets/LogoXulivert.png"
            alt="Ilustración login"
            className="login-img-animated"
            style={{ maxHeight: '400px' }}
          />
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <form className="login-form shadow p-4 rounded bg-white login-form-animated" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4 text-primary">Iniciar Sesión</h2>
            {loginError && <div className="alert alert-danger">{loginError}</div>}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className={`form-control ${!emailValid ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                placeholder="nombre@correo.com"
                value={formData.email}
                onChange={handleChange}                
              />
              {!emailValid && formData.email.trim() === '' && (
                <div className="invalid-feedback">El correo electrónico no puede estar vacío.</div>
              )}
              {!emailValid && formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                <div className="invalid-feedback">Por favor, introduce un correo válido.</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className={`form-control ${!passwordValid ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
              />
              {!passwordValid && formData.password.trim() === '' && (
                <div className="invalid-feedback">La contraseña no puede estar vacía.</div>
              )}
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary" disabled={!emailValid || !passwordValid}>
                Entrar
              </button>
            </div>
            <div className="mt-3 text-center">
              <a href="/register" className="text-decoration-none">¿No tienes cuenta? Regístrate</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
