import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/layout');
  };

  return (
    <main>
      <h3>Login</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit">
              Send
            </button>
          </div>
          <div>
            <a href="/register">
              Register
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
