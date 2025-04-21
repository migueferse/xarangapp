import registerService from '../services/registerService';

const handleRegister = async (formData, navigate, setRegisterError) => {
  try {
    const response = await registerService.register(formData);
    console.log('response', response)

    if (response && response.status === 201 && response.data && response.data.token) {
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login');
      return true;
    } else {
      setRegisterError('Error al registrarse: Respuesta inesperada del servidor.');
      return false;
    }
  } catch (error) {
    console.error('Error al registrar usuario en el controlador:', error);
    if (error.response && error.response.data && error.response.data.message) {
      setRegisterError(`Error al registrarse: ${error.response.data.message}`);
    } else if (error.response && error.response.data && error.response.data.errors) {
      const errorMessages = Object.values(error.response.data.errors).flat().join(', ');
      setRegisterError(`Error al registrarse: ${errorMessages}`);
    } else {
      setRegisterError('Error al registrarse. Por favor, inténtalo de nuevo.');
    }
    return false;
  }
};

export default {
  handleRegister,
};