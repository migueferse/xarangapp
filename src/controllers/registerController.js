import registerService from '../services/registerService';

const handleRegister = async (formData, setRegisterError) => {
  try {
    const response = await registerService.register(formData);
    console.log('response', response);

    if (response && response.status === 201 && response.data && response.data.token) {
      return { success: true };  // Devolver un objeto que indica éxito
    } else {
      setRegisterError('Error al registrarse: Respuesta inesperada del servidor.');
      return { success: false }; // Devolver un objeto que indica error
    }
  } catch (error) {
    console.error('Error al registrar usuario en el controlador:', error);

    if (error.response && error.response.data && error.response.data.errors) {
      const errorMessages = Object.values(error.response.data.errors).flat().join(' ');
      setRegisterError(`Error al registrarse: ${errorMessages}`);
    } else if (error.response && error.response.data && error.response.data.message) {
      setRegisterError(`Error al registrarse: ${error.response.data.message}`);
    } else {
      setRegisterError('Error al registrarse. Por favor, inténtalo de nuevo.');
    }

    return { success: false }; // Devolver error
  }
};

export default {
  handleRegister,
};
