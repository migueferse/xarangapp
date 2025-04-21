import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginController from '../../controllers/loginController';
import '../../styles/login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { handleLogin, loginError } = loginController();
  const navigate = useNavigate(); // Asegúrate de que useNavigate esté disponible aquí si lo necesitas para redirecciones específicas del componente

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin(formData);
    if (success) {
      // La navegación se maneja en el contexto después del login exitoso
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {loginError && <div className="error-message">{loginError}</div>}
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
  );
};

export default Login;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import loginController from '../../controllers/loginController';
// import '../../styles/login.css'


// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const navigate = useNavigate();
//   const [loginError, setLoginError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoginError('');
//     try {
//       const success = await loginController.handleLogin(formData, navigate, setLoginError);
//       if (success) {
//         // navigate('/events');
//       }
//     } catch (error) {
//       console.error('Error general en el inicio de sesión:', error);
//       setLoginError('Error inesperado al iniciar sesión.');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>        
//         {loginError && <div>{loginError}</div>}
//         <div>
//           <input
//             type="text"
//             placeholder="Email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <button type="submit">
//             Send
//           </button>
//         </div>
//         <div>
//           <a href="/register">
//             Register
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;
