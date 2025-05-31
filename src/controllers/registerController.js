import registerService from '../services/registerService';

const handleRegister = async (formData, setRegisterError) => {
  try {
    const response = await registerService.register(formData);

    if (response && response.status === 201 && response.data && response.data.token) {
      return { success: true };
    } else {
      setRegisterError('Error al registrarse: Respuesta inesperada del servidor.');
      return { success: false };
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

    return { success: false };
  }
};

const registerController = {
  handleRegister,
};

export default registerController
